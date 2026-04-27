<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    // Public
    public function index()
    {
        return Blog::where('is_published', true)
            ->orderByDesc('publish_date')
            ->get();
    }

    public function show(string $slug)
    {
        return Blog::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();
    }

    // Admin
    public function adminIndex()
    {
        return Blog::orderByDesc('created_at')->get();
    }

    public function adminShow(int $id)
    {
        return Blog::findOrFail($id);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title_ar' => 'required|string',
            'title_en' => 'nullable|string',
            'excerpt_ar' => 'required|string',
            'excerpt_en' => 'nullable|string',
            'content_ar' => 'required|string',
            'content_en' => 'nullable|string',
            'image' => 'nullable|string',
            'publish_date' => 'nullable|date',
            'is_published' => 'nullable|boolean',
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
            $data['slug'] = Str::slug($data['title_ar']);
            $count = Blog::where('slug', $data['slug'])->count();
            if ($count > 0) {
                $data['slug'] .= '-' . ($count + 1);
            }
        } else {
            $data['slug'] = Str::slug($data['slug']);
            // Make sure slug is unique when explicitly provided
            $count = Blog::where('slug', $data['slug'])->count();
            if ($count > 0) {
                $data['slug'] .= '-' . ($count + 1);
            }
        }

        $data['title_en'] = $data['title_en'] ?? $data['title_ar'];
        $data['excerpt_en'] = $data['excerpt_en'] ?? $data['excerpt_ar'];
        $data['content_en'] = $data['content_en'] ?? $data['content_ar'];

        return Blog::create($data);
    }

    public function update(Request $request, int $id)
    {
        $blog = Blog::findOrFail($id);
        
        $data = $request->only([
            'title_ar', 'title_en', 'excerpt_ar', 'excerpt_en',
            'content_ar', 'content_en', 'image', 'publish_date', 'is_published',
            'slug', 'meta_title', 'meta_description', 'keywords', 'img_alt',
            'canonical_url', 'tags', 'og_title', 'og_description', 'schema_markup'
        ]);

        if (!empty($data['slug'])) {
            $data['slug'] = Str::slug($data['slug']);
            // Ensure unique if changed
            if ($data['slug'] !== $blog->slug) {
                $count = Blog::where('slug', $data['slug'])->where('id', '!=', $id)->count();
                if ($count > 0) {
                    $data['slug'] .= '-' . ($count + 1);
                }
            }
        }

        $data['title_en'] = $data['title_en'] ?? $data['title_ar'] ?? $blog->title_ar;
        $data['excerpt_en'] = $data['excerpt_en'] ?? $data['excerpt_ar'] ?? $blog->excerpt_ar;
        $data['content_en'] = $data['content_en'] ?? $data['content_ar'] ?? $blog->content_ar;

        $blog->update($data);
        return $blog;
    }

    public function destroy(int $id)
    {
        Blog::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
