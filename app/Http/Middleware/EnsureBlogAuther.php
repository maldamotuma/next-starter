<?php

namespace App\Http\Middleware;

use App\Models\Blog;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureBlogAuther
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $blog_id = $request->route('blog');
        $auther_id = Blog::select("user_id")->find($blog_id)->user_id;
        if (Auth::id() !== $auther_id) {
            return response()->json([
                'success' => 0,
                'message' => 'You Are Not Authorized to make changes to this blog'
            ]);
        }
        return $next($request);
    }
}
