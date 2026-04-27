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
            'title_en' => 'nullable|string',
            'desc_ar' => 'required|string',
            'desc_en' => 'nullable|string',
            'image' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);
        $data['title_en'] = $data['title_en'] ?? $data['title_ar'];
        $data['desc_en'] = $data['desc_en'] ?? $data['desc_ar'];

        return Project::create($data);
    }

    public function update(Request $request, int $id)
    {
        $project = Project::findOrFail($id);
        $data = $request->only([
            'title_ar', 'title_en', 'desc_ar', 'desc_en', 'image', 'order', 'is_active',
        ]);
        
        $data['title_en'] = $data['title_en'] ?? $data['title_ar'] ?? $project->title_ar;
        $data['desc_en'] = $data['desc_en'] ?? $data['desc_ar'] ?? $project->desc_ar;

        $project->update($data);
        return $project;
    }

    public function destroy(int $id)
    {
        Project::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
