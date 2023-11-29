<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    function companyCopy($slug): JsonResponse
    {
        $copy = Company::where("slug", $slug)->first();
        return response()->json([
            'success' => 1,
            'copy' => $copy
        ]);
    }
}
