<?php

use App\Http\Controllers\admin\AdminsController;
use App\Http\Controllers\admin\AuthController as AdminAuthController;
use App\Http\Controllers\admin\BlogsController as AdminBlogsController;
use App\Http\Controllers\admin\CategoriesController;
use App\Http\Controllers\admin\CommentsController as AdminCommentsController;
use App\Http\Controllers\admin\CompanyController;
use App\Http\Controllers\admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\admin\ErrorReportController as AdminErrorReportController;
use App\Http\Controllers\admin\SectionsController;
use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\user\AuthController;
use App\Http\Controllers\user\BlogsController;
use App\Http\Controllers\user\CommentsController;
use App\Http\Controllers\user\CompanyController as UserCompanyController;
use App\Http\Controllers\user\ContactController;
use App\Http\Controllers\user\DashboardController;
use App\Http\Controllers\user\ErrorReportController;
use App\Http\Controllers\user\PagesController;
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
        Route::post("/app-login", "appLogin");
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

    Route::controller(ErrorReportController::class)->group(function () {
        Route::post("/report-error", "reportError");
    });

    Route::controller(BlogsController::class)->group(function () {
        Route::post("/create-blog", "createBlog")->middleware('blog.authorized');
        Route::get("/blogs", "blogs");
        Route::get("/blog", "blog");
        Route::post("/update-blog/{blog}", "updateBlog")->middleware(['blog.authorized', 'blog.owner']);
        Route::post("/delete-blog/{blog}", "deleteBlog")->middleware(['blog.authorized', 'blog.owner']);
        Route::post("/toggle-bookmark/{blog}", "toggleBookmark");
    });

    Route::controller(CommentsController::class)->group(function () {
        Route::post("/write-comment/{blog_id}", "writeComment");
    });

    Route::controller(PagesController::class)->group(function () {
        Route::get("/home", "home");
    });

    Route::controller(DashboardController::class)->group(function () {
        Route::get("/dashboard", "dashboard");
    });

    Route::controller(UserCompanyController::class)->group(function () {
        Route::get("/company-copy/{slug}", "companyCopy");
    });

    Route::controller(ContactController::class)->group(function(){
        Route::post("/contact", "contact");
        Route::post("/subscribe", "subscribe");
    });
});

// Admin Routes
Route::middleware("api")->prefix("admin")->group(function () {
    Route::controller(AdminAuthController::class)->group(function () {
        Route::get("/auth-user", "auth_user");
        Route::post("/signin", "signin");
        Route::post("/app-login", "appLogin");
        Route::post("/logout", "logout");
        Route::post("/forgot-password", "forgot_password")->middleware('guest');
        Route::post("/reset-password", "reset_password")->middleware('guest');
        Route::post("/update-profile-picture", "update_profile_picture");
        Route::post("/update-profile", "update_profile");
        Route::post("/change-password", "changePassword");
        Route::get("/email/verify/{id}/{hash}", "verifyEmail")->middleware(['auth:admin', 'signed']);
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

    Route::controller(AdminBlogsController::class)->group(function () {
        Route::post("/create-blog", "createBlog");
        Route::get("/blogs", "blogs");
        Route::get("/blog", "blog");
        Route::post("/update-blog/{blog}", "updateBlog");
        Route::post("/delete-blog/{blog}", "deleteBlog");
        Route::post("/toggle-bookmark/{blog}", "toggleBookmark");
    });

    Route::controller(AdminCommentsController::class)->group(function () {
        Route::post("/write-comment/{blog_id}", "writeComment");
    });

    Route::controller(AdminDashboardController::class)->group(function () {
        Route::get("/dashboard", "dashboard");
    });

    Route::controller(CompanyController::class)->group(function () {
        Route::get("/company-copies", "copies");
        Route::post("/create-copy", "createCopy");
        Route::post("/update-copy/{copy}", "updateCopy");
        Route::post("/delete-copy/{copy}", "deleteCopy");
    });
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
