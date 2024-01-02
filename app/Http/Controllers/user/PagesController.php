<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PagesController extends Controller
{
    function home(): JsonResponse
    {
        $blogs = Blog::limit(8)->inRandomOrder()->with("cat")->get();
        return response()->json([
            'success' => 1,
            'blogs' => $blogs
        ]);
    }
}
