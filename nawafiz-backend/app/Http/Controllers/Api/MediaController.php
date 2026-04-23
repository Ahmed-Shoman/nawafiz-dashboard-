<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,webp,svg,gif|max:5120',
            'folder' => 'nullable|string',
        ]);

        $folder = $request->input('folder', 'uploads');
        $path = $request->file('file')->store($folder, 'public');

        return response()->json([
            'path' => '/storage/' . $path,
            'url' => asset('storage/' . $path),
        ]);
    }

    public function destroy(Request $request)
    {
        $request->validate(['path' => 'required|string']);

        $path = str_replace('/storage/', '', $request->input('path'));
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            return response()->json(['message' => 'Deleted']);
        }

        return response()->json(['message' => 'File not found'], 404);
    }
}
