<?php

namespace App\Http\Controllers\Mail;

use App\Helpers\QueryHelper;
use App\Helpers\StorageHelper;
use App\Http\Controllers\Controller;
use App\Models\Core\User;
use App\Models\Mail\MailLog;
use App\Models\Mail\MailLogAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MailLogController extends Controller {
    /**
     * Display a listing of the records.
     */
    public function index(Request $request) {
        $authUser = $request->user();

        // check if user is an admin
        if (!$authUser->is_admin) {
            return response()->json([
                'message' => 'Access denied.',
            ], 403);
        }

        $queryParams = $request->all();

        try {
            // Initialize the query builder
            $query = MailLog::with([
                'user:id,first_name,middle_name,last_name,suffix',
                'mail_template:id,content',
                'mail_log_attachments:id,mail_log_id,file_name,file_path',
            ]);

            // Define the default query type
            $type = 'paginate';
            // Apply query parameters
            QueryHelper::apply($query, $queryParams, $type);

            // Check if a search parameter is present in the request
            if ($request->has('search')) {
                $search = $request->input('search');
                // Apply search conditions to the query
                $query->where(function ($query) use ($search) {
                    $query->where('id', 'LIKE', '%'.$search.'%');
                });
            }

            // Get the total count of records matching the query
            $total = $query->count();

            // Retrieve pagination parameters from the request
            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            QueryHelper::applyLimitAndOffset($query, $limit, $page);

            // Execute the query and get the records
            $records = $query->get();

            // Return the records and pagination info
            return response()->json([
                'records' => $records,
                'meta' => [
                    'total_records' => $total,
                    'total_pages' => ceil($total / $limit),
                ],
            ], 200);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Display the specified record.
     */
    public function show(Request $request, $id) {
        $authUser = $request->user();

        // check if user is an admin
        if (!$authUser->is_admin) {
            return response()->json([
                'message' => 'Access denied.',
            ], 403);
        }

        // Find the record by ID
        $record = MailLog::where('id', $id)
            ->with(
                'user:id,first_name,middle_name,last_name,suffix',
                'mail_template:id,content',
                'mail_log_attachments:id,mail_log_id,file_name,file_path'
            )
            ->first();

        if (!$record) {
            // Return a 404 response if the record is not found
            return response()->json([
                'message' => 'Record not found.',
            ], 404);
        }

        // Return the record
        return response()->json($record, 200);
    }

    /**
     * Store a newly created record in storage.
     */
    public function store(Request $request) {
        $authUser = $request->user();

        // check if user is an admin
        if (!$authUser->is_admin) {
            return response()->json([
                'message' => 'Access denied.',
            ], 403);
        }

        DB::beginTransaction();

        try {
            $mailTemplateId = $request->input('mail_template_id');
            $subject = $request->input('subject');
            $contentData = $request->input('content_data');

            // fetch all users
            $users = User::all();

            $createdLogs = [];

            foreach ($users as $user) {
                // create mail log per user
                $record = MailLog::create([
                    'mail_template_id' => $mailTemplateId,
                    'subject' => $subject,
                    'content_data' => $contentData,
                    'recipient_email' => $user->email,
                ]);

                // Attach the attachments (if any)
                if ($request->has('attachments')) {
                    $attachments = $request->file('attachments');
                    foreach ($attachments as $attachment) {
                        $extension = $attachment->getClientOriginalExtension();
                        $uniqueName = Str::uuid().'.'.$extension;

                        $filePath = StorageHelper::uploadFileAs($attachment, 'mail_log_attachments', $uniqueName);

                        if (!$filePath) {
                            DB::rollBack();

                            return response()->json([
                                'message' => "Failed to upload {$attachment->getClientOriginalName()}. File size too large.",
                            ], 400);
                        }

                        MailLogAttachment::create([
                            'mail_log_id' => $record->id,
                            'file_name' => $attachment->getClientOriginalName(),
                            'file_path' => $filePath,
                        ]);
                    }
                }

                $createdLogs[] = $record;
            }

            DB::commit();

            return response()->json([
                'message' => 'Mail logs created successfully.',
                'records' => $createdLogs,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Update the specified record in storage.
     */
    public function update(Request $request, $id) {
        $authUser = $request->user();

        // check if user is an admin
        if (!$authUser->is_admin) {
            return response()->json([
                'message' => 'Access denied.',
            ], 403);
        }

        try {
            // Find the record by ID
            $record = MailLog::find($id);

            if (!$record) {
                // Return a 404 response if the record is not found
                return response()->json([
                    'message' => 'Record not found.',
                ], 404);
            }

            // Update the record
            $record->update($request->all());

            // Return the updated record
            return response()->json($record, 200);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Remove the specified record from storage.
     */
    public function destroy(Request $request, $id) {
        $authUser = $request->user();

        // check if user is an admin
        if (!$authUser->is_admin) {
            return response()->json([
                'message' => 'Access denied.',
            ], 403);
        }

        try {
            // Find the record by ID
            $record = MailLog::find($id);

            if (!$record) {
                // Return a 404 response if the record is not found
                return response()->json([
                    'message' => 'Record not found.',
                ], 404);
            }

            // Delete the record
            $record->delete();

            // Return the deleted record
            return response()->json($record, 200);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
