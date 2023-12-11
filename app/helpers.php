<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;


function upload_image($image, $disk, $prefix, $path = "")
{
    // get image extension
    $extension = $image->getClientOriginalExtension();
    //generate new image name
    $image_name =   $prefix . time() . '.' . "webp";

    $manager = new ImageManager(new Driver());

    $small_image = $manager->read($image);
    $small_image->scale(width: 250);
    $small_image_encoded = $small_image->toWebp();

    Storage::disk($disk)->put(($path ? $path . "/" : "") . "small/" . $image_name, $small_image_encoded);


    $medium_image = $manager->read($image);
    $medium_image->scale(width: 500);
    $medium_image_encoded = $medium_image->toWebp();

    Storage::disk($disk)->put(($path ? $path . "/" : "") . "medium/" . $image_name, $medium_image_encoded);


    $large_image = $manager->read($image);
    $large_image->scale(width: 1000);
    $large_image_encoded = $large_image->toWebp();

    Storage::disk($disk)->put(($path ? $path . "/" : "") . "large/" . $image_name, $large_image_encoded);

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
