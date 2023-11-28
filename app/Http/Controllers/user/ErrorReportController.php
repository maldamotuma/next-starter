<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Exceptions;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ErrorReportController extends Controller
{
    function reportError(Request $request): JsonResponse
    {
        $data = $request->validate([
            'message' => 'required',
            'name' => ['required'],
            'when' => ['required'],
            'description' => ['required']
        ]);

        if (Auth::check()) {
            $data['user_id'] = Auth::id();
        } else if (Auth::guard('admin')->check()) {
            $data['admin_id'] = Auth::guard('admin')->id();
        }

        Exceptions::create($data);

        return response()->json([
            'success' => 1
        ]);
    }
}
