<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class AuthController extends Controller
{
    function auth_user(Request $request): JsonResponse
    {
        return response()->json([
            'success' => 1,
            'user' => $request->user()
        ]);
    }

    function signin(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required']
        ]);

        $credentials['is_active'] = 1;

        if (Auth::attempt($credentials, isset($request->remember))) {
            $request->session()->regenerate();

            return response()->json([
                'success' => 1,
                'user' => $request->user()
            ]);
        }

        return response()->json([
            'success' => 0,
            'message' => 'Invalid Credential'
        ]);
    }

    function signup(Request $request): JsonResponse
    {
        try {
            $data = $request->validate([
                "first_name" => "required",
                "last_name" => "required",
                "username" => ["required", "unique:users,username"],
                "email" => ['required', 'unique:users,email'],
                "gender" => ["required"],
                "password" => ["required", "confirmed"]
            ]);

            $user = User::create($data);
            event(new Registered($user));
            Auth::login($user, true);
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

    function logout(Request $request): JsonResponse
    {
        Auth::logout();

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

        $status = Password::sendResetLink(
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

        $status = Password::reset(
            $data,
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['success' => 1])
            : response()->json(['success' => 0, 'message' => __($status)]);
    }

    function update_profile_picture(Request $request): JsonResponse
    {
        $request->validate([
            'image', ['image']
        ]);

        $user = User::find(Auth::id());

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
        $user = User::find(Auth::id());
        try {
            $data = $request->validate([
                "first_name" => "required",
                "last_name" => "required",
                "username" => ["required", "unique:users,username," . $user->id],
                "email" => ['required', 'unique:users,email,' . $user->id],
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
        $user = User::find(Auth::id());

        try {
            $data = $request->validate([
                "current_password" => "required",
                "password" => ["required", "confirmed"]
            ]);

            if (Hash::check($data['current_password'], $user->password)) {
                Auth::logoutOtherDevices($data['current_password']);
                $user->update([
                    'password' => $data['password']
                ]);

                Auth::logout();

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

    function verifyEmail(EmailVerificationRequest $request): JsonResponse
    {
        $request->fulfill();

        return response()->json([
            'success' => 1
        ]);
    }

    function resendEmailVerification(Request $request): JsonResponse
    {
        $request->user()->sendEmailVerificationNotification();
        
        return response()->json([
            'success' => 1
        ]);
    }
}
