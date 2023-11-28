<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    function dashboard(): JsonResponse
    {
        $usr = Admin::select("id")->with([
            'bookmarks' => function ($query) {
                $query->latest();
                $query->limit(8);
                $query->with("cat");
            }
        ])->find(Auth::guard('admin')->id());
        $dash["blogs"] = Blog::with("cat:id,title")->latest()->limit(8)->get();
        $dash["favorites"] = $usr->bookmarks;

        return response()->json([
            'success' => 1,
            'dash' => $dash
        ]);
    }
}
