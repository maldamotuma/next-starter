<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Image;
use Illuminate\Support\Str;

class BlogsController extends Controller
{
    function createBlog(Request $request): JsonResponse
    {
        $data = $request->validate([
            'category_id' => ['required'],
            "title" => ['required'],
            "article" => ['required'],
            "body" => ['required'],
            'image' => ['image'],
            "meta_keywords" => ['required']
        ]);


        $data['slug'] = unique_random("blogs", "slug", 4, Str::slug($data['title']));
        $data['user_id'] = Auth::id();
        if ($request->hasFile('image')) {
            $image = $request->file("image");
            // get image extension
            $extension = $image->getClientOriginalExtension();
            //generate new image name
            $image_name =   "blog-usr-" . now() . Auth::id() . '.' . $extension;
            $image_path = Storage::disk("blog")->path('') . "/" . $image_name;
            Image::make($image)->save($image_path);

            $data['image'] = $image_name;
        }

        $blog = Blog::create($data);
        return response()->json([
            'success' => 1,
            'slug' => $blog->slug
        ]);
    }

    function blogs(): JsonResponse
    {
        return response()->json([
            'success' => 1,
            'blogs' => Blog::with("admin", "user", "cat")->latest()->get()
        ]);
    }

    function blog(Request $request): JsonResponse
    {
        $blog = Blog::with("admin", "user", "cat", "comments")
            ->where('slug', $request->b)
            ->first();
        $blog['related_blogs'] = Blog::where("category_id", $blog->category_id)
            ->inRandomOrder()
            ->with("cat")
            ->limit(5)
            ->get();

        return response()->json([
            'success' => 1,
            "blog" => $blog
        ]);
    }

    function updateBlog(Request $request, Blog $blog): JsonResponse
    {
        $data = $request->validate([
            'category_id' => ['required'],
            "title" => ['required'],
            "article" => ['required'],
            "body" => ['required'],
            "meta_keywords" => ['required']
        ]);

        if ($request->hasFile('image')) {
            if ($blog->image) {
                Storage::disk('blog')->delete($blog->image);
            }
            $image = $request->file("image");
            // get image extension
            $extension = $image->getClientOriginalExtension();
            //generate new image name
            $image_name =   "blog-usr-" . now() . Auth::id() . '.' . $extension;
            $image_path = Storage::disk("blog")->path('') . "/" . $image_name;
            Image::make($image)->save($image_path);

            $data['image'] = $image_name;
        }

        $blog->update($data);
        return response()->json([
            'success' => 1,
            'slug' => $blog->slug
        ]);
    }

    function deleteBlog(Blog $blog): JsonResponse
    {
        Storage::disk('blog')->delete($blog->image);
        Comment::where("blog_id", $blog->id)->delete();
        $blog->delete();
        return response()->json([
            'success' => 1
        ]);
    }
}
