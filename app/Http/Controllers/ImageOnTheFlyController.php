<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;


class ImageOnTheFlyController extends Controller
{
    function getImage(Request $request, $imgName)
    {
        $img = Storage::disk('blog')->get($imgName);
        $manager = new ImageManager(new Driver());
        $image = $manager->read($img);
        if ($request->has('width')) {
            $image->scale(width: (int)$request->width);
        }else {
            $image->scale(width: 400);
        }
        $quality = $request->has('q') ? (int)$request->q : 100;
        $encoded = $image->toWebp($quality);
        $response = Response::make($encoded);
        $response->header('Content-Type', 'image/webp');
        return $response;
    }
}
