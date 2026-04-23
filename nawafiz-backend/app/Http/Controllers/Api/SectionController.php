<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    // Public
    public function index()
    {
        return Section::where('is_active', true)->orderBy('order')->get();
    }

    public function show(string $key)
    {
        return Section::where('key', $key)->firstOrFail();
    }

    // Admin
    public function adminIndex()
    {
        return Section::orderBy('order')->get();
    }

    public function update(Request $request, string $key)
    {
        $section = Section::where('key', $key)->firstOrFail();

        $content = $request->input('content');

        // If content arrives as a JSON string (e.g. from some clients), decode it
        if (is_string($content)) {
            $content = json_decode($content, true);
        }

        $section->update([
            'content'   => $content ?? $section->content,
            'order'     => $request->input('order', $section->order),
            'is_active' => $request->input('is_active', $section->is_active),
        ]);

        return $section->fresh();
    }
}
