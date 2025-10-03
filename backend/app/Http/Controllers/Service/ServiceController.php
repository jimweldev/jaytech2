<?php

namespace App\Http\Controllers\Service;

use App\Helpers\QueryHelper;
use App\Helpers\StorageHelper;
use App\Http\Controllers\Controller;
use App\Models\Service\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller {
    /**
     * Display a paginated list of records with optional filtering and search.
     */
    public function index(Request $request) {
        $queryParams = $request->all();

        try {
            // Initialize the query builder
            $query = Service::query();

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
            $totalRecords = $query->count();

            // Retrieve pagination parameters from the request
            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            // Apply limit and offset to the query
            QueryHelper::applyLimitAndOffset($query, $limit, $page);

            // Execute the query and get the records
            $records = $query->get();

            // Return the records and pagination info
            return response()->json([
                'records' => $records,
                'meta' => [
                    'total_records' => $totalRecords,
                    'total_pages' => ceil($totalRecords / $limit),
                ],
            ], 200);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Display the specified record.
     */
    public function show($id) {
        // Find the record by ID
        $record = Service::where('id', $id)
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
        try {
            $filePath = null;

            if ($request->hasFile('thumbnail')) {
                $thumbnail = $request->file('thumbnail');
                $extension = $thumbnail->getClientOriginalExtension();
                $uniqueName = Str::uuid().'.'.$extension;

                $filePath = StorageHelper::uploadFileAs($thumbnail, 'services', $uniqueName);

                if (!$filePath) {
                    return response()->json([
                        'message' => "Failed to upload {$thumbnail->getClientOriginalName()}. File size too large.",
                    ], 400);
                }
            }

            $record = Service::create([
                'label' => $request->label,
                'description' => $request->description,
                'slug' => Str::slug($request->label),
                'thumbnail_path' => $filePath,
            ]);

            // Return the created record
            return response()->json($record, 201);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Update the specified record in storage.
     */
    public function update(Request $request, $id) {
        try {
            // Find the record by ID
            $record = Service::find($id);

            if (!$record) {
                // Return a 404 response if the record is not found
                return response()->json([
                    'message' => 'Record not found.',
                ], 404);
            }

            $filePath = $record->thumbnail_path; // default to current thumbnail

            // Case 1: A new file is uploaded
            if ($request->hasFile('thumbnail')) {
                $thumbnail = $request->file('thumbnail');
                $extension = $thumbnail->getClientOriginalExtension();
                $uniqueName = Str::uuid().'.'.$extension;

                $filePath = StorageHelper::uploadFileAs($thumbnail, 'thumbnails', $uniqueName);

                if (!$filePath) {
                    return response()->json([
                        'message' => "Failed to upload {$thumbnail->getClientOriginalName()}. File size too large.",
                    ], 400);
                }

                // Optionally delete old file if it exists
                if ($record->thumbnail_path) {
                    StorageHelper::deleteFile($record->thumbnail_path);
                }
            }
            // Case 2: Explicit request to clear thumbnail
            elseif ($request->has('thumbnail') && $request->thumbnail === '') {
                if ($record->thumbnail_path) {
                    StorageHelper::deleteFile($record->thumbnail_path);
                }
                $filePath = null;
            }

            // Update item itself
            $record->update([
                'label' => $request->label,
                'description' => $request->description,
                'slug' => Str::slug($request->label),
                'thumbnail_path' => $filePath,
            ]);

            // Return the updated record
            return response()->json($record, 200);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Remove the specified record from storage.
     */
    public function destroy($id) {
        try {
            // Find the record by ID
            $record = Service::find($id);

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
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
