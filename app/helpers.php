<?php

use Illuminate\Support\Facades\Storage;

function upload_image($image, $disk, $prefix, $path = "")
{
    // get image extension
    $extension = $image->getClientOriginalExtension();
    //generate new image name
    $image_name =   $prefix . time() . '.' . $extension;
    $img_path = Storage::disk($disk)->path('').($path ? $path."/" : "");

    // Uploading small size Images
    $image_path = $img_path . "small/" . $image_name;
    //upload the image
    Image::make($image)->resize(250, 250, function ($constraint) {
        $constraint->aspectRatio();
        $constraint->upsize();
    })->save($image_path);

    // Uploading medium size Images
    $image_path = $img_path . "medium/" . $image_name;
    //upload the image
    Image::make($image)->resize(600, 600, function ($constraint) {
        $constraint->aspectRatio();
        $constraint->upsize();
    })->save($image_path);

    // Uploading large size Images
    $image_path = $img_path . "large/" . $image_name;
    //upload the image
    Image::make($image)->resize(600, 600, function ($constraint) {
        $constraint->aspectRatio();
        $constraint->upsize();
    })->save($image_path);

    return [
        'success' => true,
        'image_name' => $image_name
    ];
}
