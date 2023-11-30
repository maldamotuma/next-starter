<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Emaillist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    function contact(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'name' => ['required'],
            'subject' => ['required'],
            'message' => ['required'],
            'contact_methode' => []
        ]);

        if (Auth::check()) {
            $data['user_id'] = Auth::id();
        }

        Contact::create($data);

        return response()->json([
            'success' => 1
        ]);
    }

    function subscribe(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email']
        ]);

        $cnt = Emaillist::where("email", $data['email'])->exists();
        if (Auth::check()) {
            $data['user_id'] = Auth::id();
        }
        if (!$cnt) {
            Emaillist::create($data);
        }
        return response()->json([
            'success' => 1
        ]);
    }
}
