<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    function dashboard(): JsonResponse
    {
        $usr = User::select("id")->with([
            'bookmarks' => function ($query) {
                $query->latest();
                $query->limit(8);
                $query->with("cat");
            }
        ])->find(Auth::id());
        $dash["blogs"] = Blog::with("cat:id,title")->latest()->limit(8)->get();
        $dash["favorites"] = $usr->bookmarks;

        return response()->json([
            'success' => 1,
            'dash' => $dash
        ]);
    }
}
