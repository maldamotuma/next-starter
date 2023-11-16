<?php

use App\Http\Controllers\user\AuthController;
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
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
