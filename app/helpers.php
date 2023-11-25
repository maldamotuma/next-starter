<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


function upload_image($image, $disk, $prefix, $path = "")
{
    // get image extension
    $extension = $image->getClientOriginalExtension();
    //generate new image name
    $image_name =   $prefix . time() . '.' . $extension;
    $img_path = Storage::disk($disk)->path('') . ($path ? $path . "/" : "");

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

// For generating random unique strings for db entry
function unique_random($table, $col, $chars = 6, $prefix = "")
{
    // Check if it is unique in the database
    $count = DB::table($table)->where($col, $prefix)->count();

    if ($count == 0) {
        // Set unique to true to break the loop
        return $prefix;
    }

    $unique = false;

    // Store tested results in array to not test them again
    $tested = [];

    do {

        // Generate random string of characters
        $random = $prefix . "-" . Str::random($chars);

        // Check if it's already testing
        // If so, don't query the database again
        if (in_array($random, $tested)) {
            continue;
        }

        // Check if it is unique in the database
        $count = DB::table($table)->where($col, $random)->count();

        // Store the random character in the tested array
        // To keep track which ones are already tested
        $tested[] = $random;

        // String appears to be unique
        if ($count == 0) {
            // Set unique to true to break the loop
            $unique = true;
        }

        // If unique is still false at this point
        // it will just repeat all the steps until
        // it has generated a random string of characters

    } while (!$unique);


    return $random;
}
