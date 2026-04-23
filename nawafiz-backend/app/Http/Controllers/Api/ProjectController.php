<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::where('is_active', true)->orderBy('order')->get();
    }

    public function adminIndex()
    {
        return Project::orderBy('order')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title_ar' => 'required|string',
            'title_en' => 'required|string',
            'desc_ar' => 'required|string',
            'desc_en' => 'required|string',
            'image' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);
        return Project::create($data);
    }

    public function update(Request $request, int $id)
    {
        $project = Project::findOrFail($id);
        $project->update($request->only([
            'title_ar', 'title_en', 'desc_ar', 'desc_en', 'image', 'order', 'is_active',
        ]));
        return $project;
    }

    public function destroy(int $id)
    {
        Project::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
