<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SectionsController extends Controller
{
    function addSection(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'unique:sections,title'],
            'is_active' => ['boolean']
        ]);

        $section = Section::create($data);

        return response()->json([
            'success' => 1,
            'section' => $section
        ]);
    }

    function sections(): JsonResponse
    {
        return response()->json([
            'success' => 1,
            'sections' => Section::latest()->get()
        ]);
    }

    function updateSection(Request $request, Section $section): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'unique:sections,title,' . $section->id],
            'is_active' => ['boolean']
        ]);

        $section->update($data);
        return response()->json([
            'success' => 1,
            'section' => $section
        ]);
    }

    function deleteSection(Section $section): JsonResponse
    {
        $section->delete();
        return response()->json([
            'success' => 1
        ]);
    }
}
