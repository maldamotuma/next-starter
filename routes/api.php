<?php

use App\Http\Controllers\admin\AdminsController;
use App\Http\Controllers\admin\CategoriesController;
use App\Http\Controllers\admin\ErrorReportController as AdminErrorReportController;
use App\Http\Controllers\admin\SectionsController;
use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\user\AuthController;
use App\Http\Controllers\user\ErrorReportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware("api")->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::get("/auth-user", "auth_user");
        Route::post("/signin", "signin");
        Route::post("/signup", "signup");
        Route::post("/logout", "logout");
        Route::post("/forgot-password", "forgot_password")->middleware('guest');
        Route::post("/reset-password", "reset_password")->middleware('guest');
        Route::post("/update-profile-picture", "update_profile_picture");
        Route::post("/update-profile", "update_profile");
        Route::post("/change-password", "changePassword");
        Route::get("/email/verify/{id}/{hash}", "verifyEmail")->middleware(['auth', 'signed'])->name('verification.verify');
        Route::post("/email/verification-notification", "resendEmailVerification");
    });

    Route::controller(SectionsController::class)->group(function () {
        Route::post("/add-section", "addSection");
        Route::get("/sections", "sections");
        Route::post("/update-section/{section}", "updateSection");
        Route::post("/delete-section/{section}", "deleteSection");
    });

    Route::controller(CategoriesController::class)->group(function () {
        Route::post("/add-category", "addCategory");
        Route::get("/categories", "categories");
        Route::post("/update-category/{category}", "updateCategory");
        Route::post("/delete-category/{category}", "deleteCategory");
    });

    Route::controller(AdminsController::class)->group(function () {
        Route::get("/admins", "admins");
        Route::post("/add-admin", "addAdmin");
        Route::post("/update-admin/{admin}", "updateAdmin");
        Route::post("/delete-admin/{admin}", "deleteAdmin");
    });

    Route::controller(UserController::class)->group(function () {
        Route::get("/users", "users");
        Route::post("/add-user", "addUser");
        Route::post("/update-user/{user}", "updateUser");
        Route::post("/delete-user/{user}", "deleteUser");
    });

    Route::controller(ErrorReportController::class)->group(function () {
        Route::post("/report-error", "reportError");
    });
    Route::controller(AdminErrorReportController::class)->group(function () {
        Route::get("/exceptions", "exceptions");
        Route::post("/delete-exception/{ex}", "deleteException");
    });
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
