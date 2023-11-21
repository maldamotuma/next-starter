<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Exceptions;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ErrorReportController extends Controller
{
    function exceptions() : JsonResponse {
        $exceptions = Exceptions::latest()->get();
        return response()->json([
            'success' => 1,
            'result' => $exceptions
        ]);
    }

    function deleteException(Exceptions $ex) : JsonResponse {
        $ex->delete();
        return response()->json([
            'success' => 1
        ]);
    }
}
