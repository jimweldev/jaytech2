<?php

namespace App\Http\Controllers\Select;

use App\Helpers\QueryHelper;
use App\Http\Controllers\Controller;
use App\Models\Core\RbacPermission;
use App\Models\Core\RbacRole;
use App\Models\System\SystemGlobalDropdown;
use App\Models\Service\Service;
use App\Models\Service\ServiceProduct;
use App\Models\Service\ServiceProductVariantAttribute;
use App\Models\Service\ServiceProductVariant;
use App\Models\Service\ServiceProductVariantValue;

use Illuminate\Http\Request;

class SelectController extends Controller {
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
     * Display a paginated list of services with optional filtering and search.
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
                    $query->where('label', 'LIKE', '%'.$search.'%')
                        ->orWhere('description', 'LIKE', '%'.$search.'%');
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
     * Display a paginated list of products with optional filtering and search.
     */
    public function getSelectProducts(Request $request) {
        $queryParams = $request->all();

        try {
            $query = ServiceProduct::query();

            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('label', 'LIKE', '%'.$search.'%')
                        ->orWhere('description', 'LIKE', '%'.$search.'%');
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
     * Display a paginated list of product variant attributes with optional filtering and search.
     */
    public function getSelectProductVariantAttributes(Request $request) {
        $queryParams = $request->all();

        try {
            $query = ServiceProductVariantAttribute::query();

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
     * Display a paginated list of variants with optional filtering and search.
     */
    public function getSelectVariants(Request $request) {
        $queryParams = $request->all();

        try {
            $query = ServiceProductVariant::query();

            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('sku', 'LIKE', '%'.$search.'%');
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
     * Display a paginated list of variant values with optional filtering and search.
     */
    public function getSelectVariantValues(Request $request) {
        $queryParams = $request->all();

        try {
            $query = ServiceProductVariantValue::query();

            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('value', 'LIKE', '%'.$search.'%');
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
