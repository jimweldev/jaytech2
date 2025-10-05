<?php

namespace App\Http\Controllers\Select;

use App\Helpers\QueryHelper;
use App\Http\Controllers\Controller;
use App\Models\Core\RbacPermission;
use App\Models\Core\RbacRole;
use App\Models\Core\User;
use App\Models\Mail\MailTemplate;
use App\Models\Service\Service;
use App\Models\Service\ServiceBrandCategory;
use App\Models\Service\ServiceItem;
use App\Models\Service\ServiceBookingDropPointTechnician;
use App\Models\System\SystemGlobalDropdown;
use Illuminate\Http\Request;

class SelectController extends Controller {
    /**
     * Display a paginated list of users with optional filtering and search.
     */
    public function getSelectUsers(Request $request) {
        $queryParams = $request->all();

        try {
            $query = User::query();

            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('first_name', 'LIKE', '%'.$search.'%')
                        ->orWhere('last_name', 'LIKE', '%'.$search.'%');
                });
            }

            $total = $query->count();

            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            QueryHelper::applyLimitAndOffset($query, $limit, $page);

            $records = $query->get();

            return response()->json([
                'records' => $records,
                'meta' => [
                    'total_records' => $total,
                    'total_pages' => ceil($total / $limit),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Display a paginated list of roles with optional filtering and search.
     */
    public function getSelectRoles(Request $request) {
        $queryParams = $request->all();

        try {
            $query = RbacRole::query();

            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('label', 'LIKE', '%'.$search.'%')
                        ->orWhere('value', 'LIKE', '%'.$search.'%');
                });
            }

            $total = $query->count();

            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            QueryHelper::applyLimitAndOffset($query, $limit, $page);

            $records = $query->get();

            return response()->json([
                'records' => $records,
                'meta' => [
                    'total_records' => $total,
                    'total_pages' => ceil($total / $limit),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Display a paginated list of permissions with optional filtering and search.
     */
    public function getSelectPermissions(Request $request) {
        $queryParams = $request->all();

        try {
            $query = RbacPermission::query();

            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('label', 'LIKE', '%'.$search.'%')
                        ->orWhere('value', 'LIKE', '%'.$search.'%');
                });
            }

            $total = $query->count();

            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            QueryHelper::applyLimitAndOffset($query, $limit, $page);

            $records = $query->get();

            return response()->json([
                'records' => $records,
                'meta' => [
                    'total_records' => $total,
                    'total_pages' => ceil($total / $limit),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Display a paginated list of system global dropdowns with optional filtering and search.
     */
    public function getSelectSystemGlobalDropdowns(Request $request) {
        $queryParams = $request->all();

        try {
            $query = SystemGlobalDropdown::query();

            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('label', 'LIKE', '%'.$search.'%');
                });
            }

            $total = $query->count();

            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            QueryHelper::applyLimitAndOffset($query, $limit, $page);

            $records = $query->get();

            return response()->json([
                'records' => $records,
                'meta' => [
                    'total_records' => $total,
                    'total_pages' => ceil($total / $limit),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Display a paginated list of permissions with optional filtering and search.
     */
    public function getSelectServices(Request $request) {
        $queryParams = $request->all();

        try {
            $query = Service::query();

            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('id', 'LIKE', '%'.$search.'%')
                        ->orWhere('label', 'LIKE', '%'.$search.'%');
                });
            }

            $total = $query->count();

            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            QueryHelper::applyLimitAndOffset($query, $limit, $page);

            $records = $query->get();

            return response()->json([
                'records' => $records,
                'meta' => [
                    'total_records' => $total,
                    'total_pages' => ceil($total / $limit),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Display a paginated list of permissions with optional filtering and search.
     */
    public function getSelectServiceBrandCategories(Request $request) {
        $queryParams = $request->all();

        try {
            $query = ServiceBrandCategory::with(['service_brand', 'service']);

            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('id', 'LIKE', '%'.$search.'%');
                });
            }

            $total = $query->count();

            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            QueryHelper::applyLimitAndOffset($query, $limit, $page);

            $records = $query->get();

            return response()->json([
                'records' => $records,
                'meta' => [
                    'total_records' => $total,
                    'total_pages' => ceil($total / $limit),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function getSelectServiceItems(Request $request) {
        $queryParams = $request->all();

        try {
            $query = ServiceItem::query();

            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('id', 'LIKE', '%'.$search.'%');
                });
            }

            $total = $query->count();

            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            QueryHelper::applyLimitAndOffset($query, $limit, $page);

            $records = $query->get();

            return response()->json([
                'records' => $records,
                'meta' => [
                    'total_records' => $total,
                    'total_pages' => ceil($total / $limit),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function getSelectMailTemplates(Request $request) {
        $queryParams = $request->all();

        try {
            $query = MailTemplate::query();

            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('id', 'LIKE', '%'.$search.'%')
                        ->orWhere('label', 'LIKE', '%'.$search.'%');
                });
            }

            $total = $query->count();

            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            QueryHelper::applyLimitAndOffset($query, $limit, $page);

            $records = $query->get();

            return response()->json([
                'records' => $records,
                'meta' => [
                    'total_records' => $total,
                    'total_pages' => ceil($total / $limit),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
    
    public function getSelectDropPointechnicians(Request $request) {
        $queryParams = $request->all();

        try {
            $query = ServiceBookingDropPointTechnician::with([
                        'service_booking_drop_point',
                        'technician',
                    ])
                    ->select('service_booking_drop_point_technicians.*')
                    ->leftJoin('service_booking_drop_points', 'service_booking_drop_point_technicians.service_booking_drop_point_id', '=', 'service_booking_drop_points.id')
                    ->leftJoin('users', 'service_booking_drop_point_technicians.technician_id', '=', 'users.id')
                    ->orderBy('service_booking_drop_points.location', 'asc')
                    ->orderBy('users.first_name', 'asc');

            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('service_booking_drop_points.id', 'LIKE', '%'.$search.'%')
                        ->orWhereHas('technician', function ($q) use ($search) {
                            $q->where('first_name', 'LIKE', '%'.$search.'%')
                                ->orWhere('last_name', 'LIKE', '%'.$search.'%');
                        })
                        ->orWhereHas('service_booking_drop_point', function ($q) use ($search) {
                            $q->where('location', 'LIKE', '%'.$search.'%');
                        });
                });
            }

            $total = $query->count();

            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            QueryHelper::applyLimitAndOffset($query, $limit, $page);

            $records = $query->get();

            return response()->json([
                'records' => $records,
                'meta' => [
                    'total_records' => $total,
                    'total_pages' => ceil($total / $limit),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
