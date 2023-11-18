<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    function addCategory(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'unique:categories,title'],
            'section_id' => ['required'],
            'parent_id' => [],
            'is_active' => ['boolean']
        ]);

        $category = Category::create($data);

        return response()->json([
            'success' => 1,
            'category' => $category
        ]);
    }

    function categories(): JsonResponse
    {
        return response()->json([
            'success' => 1,
            'categories' => Category::latest()->get()
        ]);
    }

    function updateCategory(Request $request, Category $category): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'unique:categories,title,' . $category->id],
            'section_id' => ['required'],
            'parent_id' => [],
            'is_active' => ['boolean']
        ]);

        $category->update($data);
        return response()->json([
            'success' => 1,
            'category' => $category
        ]);
    }

    function deleteCategory(Category $category): JsonResponse
    {
        $category->delete();
        return response()->json([
            'success' => 1
        ]);
    }
}
