<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Emaillist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactsController extends Controller
{
    function contacts(): JsonResponse
    {
        return response()->json([
            'success' => 1,
            'contacts' => Contact::latest()->get()
        ]);
    }

    function deleteContact(Contact $contact): JsonResponse
    {
        $contact->delete();
        return response()->json([
            'success' => 1
        ]);
    }

    function emailList(): JsonResponse
    {
        return response()->json([
            'success' => 1,
            'emails' => Emaillist::latest()->get()
        ]);
    }

    function deleteEmail(Emaillist $email): JsonResponse
    {
        $email->delete();
        return response()->json([
            'success' => 1
        ]);
    }
}
