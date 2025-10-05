<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Core\AuthController;
use App\Http\Controllers\Core\RbacPermissionController;
use App\Http\Controllers\Core\RbacRoleController;
use App\Http\Controllers\Core\UserController;
use App\Http\Controllers\Example\TaskController;
use App\Http\Controllers\Mail\MailLogController;
use App\Http\Controllers\Mail\MailTemplateController;
use App\Http\Controllers\Select\SelectController;
use App\Http\Controllers\Service\ServiceBookingDropPointController;
use App\Http\Controllers\Service\ServiceBookingDropPointTechnicianController;
use App\Http\Controllers\Service\ServiceBrandController;
use App\Http\Controllers\Service\ServiceBrandModelController;
use App\Http\Controllers\Service\ServiceBrandModelItemController;
use App\Http\Controllers\Service\ServiceController;
use App\Http\Controllers\Service\ServiceItemController;
use App\Http\Controllers\Service\ServiceClaimedVoucherController;
use App\Http\Controllers\Service\ServiceVoucherController;
use App\Http\Controllers\System\SystemGlobalDropdownController;
use App\Http\Controllers\System\SystemSettingController;
use App\Http\Controllers\User\UserImageController;
use Illuminate\Support\Facades\Route;

Route::get('', function () {
    return response()->json(['message' => 'Hello World!']);
});

Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/refresh-token', [AuthController::class, 'refreshToken']);

Route::middleware('auth.middleware')->group(function () {
    // ===================================================================
    // ===================================================================
    // === CORE
    // ===================================================================
    // ===================================================================
    // ==============
    // === USERS
    // user roles
    Route::get('/users/{id}/user-roles', [UserController::class, 'getUserRoles']);
    Route::patch('/users/{id}/user-roles', [UserController::class, 'updateUserRoles']);

    // archived users
    Route::get('/users/archived', [UserController::class, 'getAllArchivedUsers']);
    Route::get('/users/{id}/archived', [UserController::class, 'getArchivedUser']);
    Route::post('/users/{id}/archived/restore', [UserController::class, 'restoreArchivedUser']);

    // active users
    Route::resource('/users', UserController::class);

    // ==============
    // === RBAC
    // roles
    Route::get('/rbac/roles/{id}/permissions/{permissionId}', [RbacRoleController::class, 'getPermission']);
    Route::post('/rbac/roles/{id}/permissions', [RbacRoleController::class, 'addPermission']);
    Route::delete('/rbac/roles/{id}/permissions/{permissionId}', [RbacRoleController::class, 'removePermission']);
    Route::resource('/rbac/roles', RbacRoleController::class);

    // permissions
    Route::resource('/rbac/permissions', RbacPermissionController::class);

    // ==============
    // === USER IMAGES
    Route::resource('/user-images', UserImageController::class);

    // ===================================================================
    // ===================================================================
    // === ADMIN
    // ===================================================================
    // ===================================================================

    // ==============
    // === DASHBOARD
    Route::get('/dashboard/statistics', [DashboardController::class, 'getDashboardStatistics']);
    Route::get('/dashboard/user-registration-stats', [DashboardController::class, 'getUserRegistrationStats']);
    Route::get('/dashboard/account-types', [DashboardController::class, 'getDashboardAccountTypes']);

    // ==============
    // === MAILS
    // mail templates
    Route::resource('/mails/templates', MailTemplateController::class);

    // mail logs
    Route::resource('/mails/logs', MailLogController::class);

    // ==============
    // === SYSTEM
    // system settings
    Route::resource('/system/settings', SystemSettingController::class);

    // global dropdowns
    Route::resource('/system/global-dropdowns', SystemGlobalDropdownController::class);

    // ==============
    // === SERVICES
    // service  brand model items
    Route::resource('/services/brands/models/items', ServiceBrandModelItemController::class);

    // service brand models
    Route::resource('/services/brands/models', ServiceBrandModelController::class);

    // service drop point technicians
    Route::resource('/services/drop-points/technicians', ServiceBookingDropPointTechnicianController::class);

    // service drop points
    Route::resource('/services/drop-points', ServiceBookingDropPointController::class);

    // service brands
    Route::resource('/services/brands', ServiceBrandController::class);

    // service items
    Route::resource('/services/items', ServiceItemController::class);

    // service vouchers
    Route::resource('/services/vouchers', ServiceVoucherController::class);

    // service vouchers
    Route::resource('/services/claimed-vouchers', ServiceClaimedVoucherController::class);

    // services
    Route::resource('/services', ServiceController::class);

    // ==============
    // === SELECTS
    Route::get('/select/users', [SelectController::class, 'getSelectUsers']);
    Route::get('/select/roles', [SelectController::class, 'getSelectRoles']);
    Route::get('/select/permissions', [SelectController::class, 'getSelectPermissions']);
    Route::get('/select/global-dropdowns', [SelectController::class, 'getSelectSystemGlobalDropdowns']);
    Route::get('/select/services', [SelectController::class, 'getSelectServices']);
    Route::get('/select/service-brand-categories', [SelectController::class, 'getSelectServiceBrandCategories']);
    Route::get('/select/service-items', [SelectController::class, 'getSelectServiceItems']);
    Route::get('/select/mail-templates', [SelectController::class, 'getSelectMailTemplates']);

    // ==============
    // === SETTINGS
    // general
    Route::patch('/settings', [UserController::class, 'updateUserSettings']);
    Route::patch('/settings/profile', [UserController::class, 'updateProfile']);
    Route::post('/settings/profile/avatar', [UserController::class, 'updateProfileAvatar']);
    Route::patch('/settings/change-password', [UserController::class, 'changePassword']);

    // ==============
    // === NOTIFICATIONS
    Route::get('/notifications', [UserController::class, 'getAllNotifications']);
    Route::patch('/notifications/{id}', [UserController::class, 'viewNotification'])->whereNumber('id');
    Route::patch('/notifications/mark-all-as-read', [UserController::class, 'markAllAsReadNotifications']);

    // unread notifications count
    Route::get('/notifications/unread-count', [UserController::class, 'getUnreadNotificationsCount']);
});

// ===================================================================
// ===================================================================
// === EXAMPLE
// ===================================================================
// ===================================================================

// ==============
// === TASKS
Route::resource('/tasks', TaskController::class);
Route::post('/tasks/create-payment-intent', [TaskController::class, 'createPaymentIntent']);
