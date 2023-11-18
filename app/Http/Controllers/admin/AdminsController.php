<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminsController extends Controller
{
    function admins(): JsonResponse
    {
        $admins = Admin::latest()->get();
        return response()->json([
            'success' => 1,
            'admins' => $admins
        ]);
    }

    function addAdmin(Request $request): JsonResponse
    {
        $data = $request->validate([
            "first_name" => "required",
            "last_name" => "required",
            "username" => ["required", "unique:admins,username"],
            "email" => ['required', 'unique:admins,email'],
            "gender" => ["required"],
            "is_super" => ["required"]
        ]);

        $data['password'] = Str::random(8);

        $admin = Admin::create($data);
        return response()->json([
            'success' => 1,
            'admin' => $admin
        ]);
    }

    function updateAdmin(Request $request, Admin $admin): JsonResponse
    {
        $data = $request->validate([
            "first_name" => "required",
            "last_name" => "required",
            "username" => ["required", "unique:admins,username," . $admin->id],
            "email" => ['required', 'unique:admins,email,' . $admin->id],
            "gender" => ["required"],
            "is_super" => ["required"]
        ]);

        $admin->update($data);
        return response()->json([
            'success' => 1,
            'admin' => $admin
        ]);
    }

    function deleteAdmin(Admin $admin): JsonResponse
    {
        if ($admin->profile_picture) {
            Storage::disk('avatar')->delete("small/" . $admin->profile_picture);
            Storage::disk('avatar')->delete("medium/" . $admin->profile_picture);
            Storage::disk('avatar')->delete("large/" . $admin->profile_picture);
        }
        $admin->delete();
        return response()->json([
            'success' => 1
        ]);
    }
}
