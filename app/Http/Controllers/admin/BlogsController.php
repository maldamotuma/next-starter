<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;

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
        $data['admin_id'] = Auth::guard('admin')->id();
        if ($request->hasFile('image')) {
            $image = $request->file("image");
            //generate new image name
            $image_name =   $data['slug'] . '.' . "webp";

            $manager = new ImageManager(new Driver());
            $img = $manager->read($image);
            $img_encoded = $img->toWebp();
            Storage::disk("blog")->put($image_name, $img_encoded);

            $data['image'] = $image_name;
        }

        $blog = Blog::create($data);
        return response()->json([
            'success' => 1,
            'slug' => $blog->slug
        ]);
    }

    function blogs(Request $request): JsonResponse
    {
        if ($request->has('q')) {
            $query = $request->q;
            $split_string = Str::of($query)->squish()->explode(' ')->toArray();
            $join_chars = join('%', $split_string);
            $blogs = Blog::where('title', 'LIKE', "%{$join_chars}%")
                ->orWhere('article', 'LIKE', "%{$join_chars}%")
                ->select('title', 'slug')
                ->limit(15)->get();
            return response()->json([
                'success' => 1,
                'blogs' => $blogs
            ]);
        } else if ($request->has("favorites")) {
            $usr = Admin::select('id')->with(['bookmarks' => function ($query) {
                $query->select("blogs.id", "blogs.title", "blogs.slug", "blogs.image", "blogs.category_id", "blogs.article");
                $query->with("cat:id,title");
            }])->find(Auth::guard('admin')->id())->toArray();
            $blogs = $usr["bookmarks"];
            return response()->json([
                'success' => 1,
                'blogs' => $blogs
            ]);
        } else if ($request->has("mine")) {
            $blogs = Blog::with("admin", "cat")
                ->where('admin_id', Auth::guard('admin')->id())
                ->latest()->get();
            return response()->json([
                'success' => 1,
                'blogs' => $blogs
            ]);
        }
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
        $blog['is_favorite'] = $blog->is_favorite ? 1 : 0;

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
            $image = $request->file("image");

            $manager = new ImageManager(new Driver());
            $img = $manager->read($image);
            $img_encoded = $img->toWebp();
            Storage::disk("blog")->put($blog->image, $img_encoded);
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

    function toggleBookmark($blog): JsonResponse
    {
        $usr = Admin::select("id")->find(Auth::guard('admin')->id());
        $usr->bookmarks()->toggle($blog);
        return response()->json([
            'success' => 1
        ]);
    }

    function saveBlogChanges(Request $request, Blog $blog): JsonResponse
    {
        $data = $request->validate([
            'blog' => ['required']
        ]);

        $blog->update([
            'body' => $data['blog']
        ]);

        return response()->json([
            'success' => 1
        ]);
    }
}
