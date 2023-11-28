<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentsController extends Controller
{
    function writeComment(Request $request, $blog_id): JsonResponse
    {
        $data = $request->validate([
            'replay_id' => [],
            'comment' => ['required']
        ]);

        $data['admin_id'] = Auth::guard('user')->id();
        $data['blog_id'] = $blog_id;

        $comment = Comment::create($data);

        return response()->json([
            'success' => 1,
            'comment' => $comment
        ]);
    }
}
