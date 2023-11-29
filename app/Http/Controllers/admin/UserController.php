<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{
    function users(Request $request): JsonResponse
    {
        if ($request->has("q")) {
            $query = $request->q;
            if ($query && $request->by) {
                $users = User::latest()
                    ->where($request->by, "LIKE", "%" . $query . "%")
                    ->get();
                return response()->json([
                    'success' => 1,
                    'result' => $users
                ]);
            } else {
                return response()->json([
                    'success' => 0,
                    'result' => []
                ]);
            }
        } else {
            $users = User::latest()->get();
            return response()->json([
                'success' => 1,
                'users' => $users
            ]);
        }
    }

    function addUser(Request $request): JsonResponse
    {
        $data = $request->validate([
            "first_name" => "required",
            "last_name" => "required",
            "username" => ["required", "unique:users,username"],
            "email" => ['required', 'unique:users,email'],
            "gender" => ["required"],
            "can_blog" => []
        ]);
        if ($request->can_blog === "can_blog") {
            $data['can_blog'] = Carbon::now();
        } else {
            $data['can_blog'] = null;
        }
        $data['password'] = Str::random(8);

        $user = User::create($data);
        event(new Registered($user));

        return response()->json([
            'success' => 1,
            'user' => $user
        ]);
    }

    function updateUser(Request $request, User $user): JsonResponse
    {
        $data = $request->validate([
            "first_name" => "required",
            "last_name" => "required",
            "username" => ["required", "unique:users,username," . $user->id],
            "email" => ['required', 'unique:users,email,' . $user->id],
            "gender" => ["required"],
            "can_blog" => []
        ]);
        if ($request->can_blog === "can_blog") {
            $data['can_blog'] = Carbon::now();
        } else {
            $data['can_blog'] = null;
        }
        $user->update($data);
        return response()->json([
            'success' => 1,
            'user' => $user
        ]);
    }

    function deleteUser(User $user): JsonResponse
    {
        if ($user->profile_picture) {
            Storage::disk('avatar')->delete("small/" . $user->profile_picture);
            Storage::disk('avatar')->delete("medium/" . $user->profile_picture);
            Storage::disk('avatar')->delete("large/" . $user->profile_picture);
        }
        $user->delete();
        return response()->json([
            'success' => 1
        ]);
    }
}
