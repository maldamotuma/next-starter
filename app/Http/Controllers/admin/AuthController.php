<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    function auth_user(Request $request): JsonResponse
    {
        $user = Auth::guard('admin')->user();
        return response()->json([
            'success' => 1,
            'user' => $request->user('admin')
        ]);
    }

    function signin(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required']
        ]);

        $credentials['is_active'] = 1;

        if (Auth::guard('admin')->attempt($credentials, isset($request->remember))) {
            $request->session()->regenerate();

            return response()->json([
                'success' => 1,
                'user' => $request->user('admin')
            ]);
        }

        return response()->json([
            'success' => 0,
            'message' => 'Invalid Credential'
        ]);
    }

    function logout(Request $request): JsonResponse
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'success' => 1,
            'user' => null
        ]);
    }

    function forgot_password(Request $request): JsonResponse
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::broker('admin')->sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            $request->session()->put("reset-email", $request->email);
        }

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['success' => 1])
            : response()->json(['success' => 0, 'message' => __($status)]);
    }

    function reset_password(Request $request): JsonResponse
    {
        $data = $request->validate([
            'token' => 'required',
            'password' => 'required|min:8|confirmed',
            'password_confirmation' => []
        ]);

        $data['email'] = $request->session()->pull("reset-email", "");

        $status = Password::broker('admin')->reset(
            $data,
            function (Admin $admin, string $password) {
                $admin->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $admin->save();

                event(new PasswordReset($admin));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['success' => 1])
            : response()->json(['success' => 0, 'message' => __($status)]);
    }

    function verifyEmail(EmailVerificationRequest $request): JsonResponse
    {
        $request->fulfill();

        return response()->json([
            'success' => 1
        ]);
    }

    function resendEmailVerification(Request $request): JsonResponse
    {
        $request->user('admin')->sendEmailVerificationNotification();

        return response()->json([
            'success' => 1
        ]);
    }

    function update_profile_picture(Request $request): JsonResponse
    {
        $request->validate([
            'image', ['image']
        ]);

        $user = Admin::find(Auth::guard('admin')->id());

        $profile_picture = upload_image(
            $request->image,
            'avatar',
            "u" . $user->id
        );

        if ($user->profile_picture) {
            Storage::disk('avatar')->delete("small/" . $user->profile_picture);
            Storage::disk('avatar')->delete("medium/" . $user->profile_picture);
            Storage::disk('avatar')->delete("large/" . $user->profile_picture);
        }

        if ($profile_picture['success']) {
            $user->profile_picture = $profile_picture['image_name'];
            $user->save();
            return response()->json([
                'success' => 1,
                'profile_picture' => $profile_picture['image_name']
            ]);
        } else {
            return response()->json([
                'success' => 0,
                'message' => "Image not Updated"
            ]);
        }
    }

    function update_profile(Request $request): JsonResponse
    {
        $user = Admin::find(Auth::guard('id')->id());
        try {
            $data = $request->validate([
                "first_name" => "required",
                "last_name" => "required",
                "username" => ["required", "unique:admins,username," . $user->id],
                "email" => ['required', 'unique:admins,email,' . $user->id],
                "gender" => ["required"],
                "phone" => []
            ]);

            $user->update($data);
            return response()->json([
                'success' => 1,
                'user' => $user
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => 0,
                'message' => $th->getMessage(),
            ]);
        }
    }

    function changePassword(Request $request): JsonResponse
    {
        $user = Admin::find(Auth::guard('id')->id());

        try {
            $data = $request->validate([
                "current_password" => "required",
                "password" => ["required", "confirmed"]
            ]);

            if (Hash::check($data['current_password'], $user->password)) {
                Auth::guard('admin')->logoutOtherDevices($data['current_password']);
                $user->update([
                    'password' => $data['password']
                ]);

                Auth::guard('admin')->logout();

                $request->session()->invalidate();

                $request->session()->regenerateToken();

                return response()->json([
                    'success' => 1
                ]);
            }
            return response()->json([
                'success' => 0,
                'message' => "Invalid Current Password",
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => 0,
                'message' => $th->getMessage(),
            ]);
        }
    }

    function appLogin(Request $request): JsonResponse
    {
        $email = $request->email;
        $user = Admin::where("email", $email)->first();
        if ($user && !$user->email_verified_at) {
            $user->email_verified_at = Carbon::now();
            $user->save();
        }

        if ($user) {
            Auth::guard('admin')->login($user, true);
        }
        return response()->json([
            'success' => 1,
            'user' => $user
        ]);
    }
}
