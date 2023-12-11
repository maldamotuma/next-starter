<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;

class CompanyController extends Controller
{
    function copies(): JsonResponse
    {
        $copies = Company::all();
        return response()->json([
            'success' => 1,
            'copies' => $copies
        ]);
    }

    function createCopy(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'unique:company,title'],
            'content' => 'required',
            'image' => ['required', 'image'],
            'is_active' => []
        ]);

        $data['slug'] = Str::slug($data['title']);
        if ($request->hasFile('image')) {
            $image = $request->file("image");
            //generate new image name
            $image_name =   "company-" . $data['slug'] . '.' . "webp";

            $manager = new ImageManager(new Driver());
            $img = $manager->read($image);
            $img_encoded = $img->toWebp();
            Storage::disk("blog")->put($image_name, $img_encoded);

            $data['image'] = $image_name;
        }
        $copy = Company::create($data);

        return response()->json([
            'success' => 1,
            'copy' => $copy
        ]);
    }

    function updateCopy(Request $request, Company $copy): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'unique:company,title,' . $copy->id],
            'content' => 'required',
            'is_active' => []
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file("image");

            $manager = new ImageManager(new Driver());
            $img = $manager->read($image);
            $img_encoded = $img->toWebp();
            Storage::disk("blog")->put($copy->image, $img_encoded);
        }

        $copy->update($data);
        return response()->json([
            'success' => 1,
            'copy' => $copy
        ]);
    }

    function deleteCopy(Company $copy): JsonResponse
    {
        Storage::disk('blog')->delete($copy->image);
        $copy->delete();
        return response()->json([
            'success' => 1
        ]);
    }
}
