<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    // Public
    public function index()
    {
        return Service::where('is_active', true)->orderBy('order')->get();
    }

    public function show(string $slug)
    {
        return Service::where('slug', $slug)->firstOrFail();
    }

    // Admin
    public function adminIndex()
    {
        return Service::orderBy('order')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title_ar' => 'required|string',
            'title_en' => 'required|string',
            'short_desc_ar' => 'required|string',
            'short_desc_en' => 'required|string',
            'long_desc_ar' => 'required|string',
            'long_desc_en' => 'required|string',
            'features_ar' => 'required|array',
            'features_en' => 'required|array',
            'image' => 'nullable|string',
            'icon' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
            'slug' => 'nullable|string',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'keywords' => 'nullable|string',
            'img_alt' => 'nullable|string',
            'canonical_url' => 'nullable|string',
            'tags' => 'nullable|string',
            'og_title' => 'nullable|string',
            'og_description' => 'nullable|string',
            'schema_markup' => 'nullable|string',
        ]);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title_en']);
            $count = Service::where('slug', $data['slug'])->count();
            if ($count > 0) {
                $data['slug'] .= '-' . ($count + 1);
            }
        } else {
            $data['slug'] = Str::slug($data['slug']);
            // Make slug unique
            $count = Service::where('slug', $data['slug'])->count();
            if ($count > 0) {
                $data['slug'] .= '-' . ($count + 1);
            }
        }

        return Service::create($data);
    }

    public function update(Request $request, int $id)
    {
        $service = Service::findOrFail($id);
        
        $data = $request->only([
            'title_ar', 'title_en', 'short_desc_ar', 'short_desc_en',
            'long_desc_ar', 'long_desc_en', 'features_ar', 'features_en',
            'image', 'icon', 'order', 'is_active',
            'slug', 'meta_title', 'meta_description', 'keywords', 'img_alt',
            'canonical_url', 'tags', 'og_title', 'og_description', 'schema_markup'
        ]);

        if (!empty($data['slug'])) {
            $data['slug'] = Str::slug($data['slug']);
            if ($data['slug'] !== $service->slug) {
                $count = Service::where('slug', $data['slug'])->where('id', '!=', $id)->count();
                if ($count > 0) {
                    $data['slug'] .= '-' . ($count + 1);
                }
            }
        }

        $service->update($data);
        return $service;
    }

    public function destroy(int $id)
    {
        Service::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
