<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        return Testimonial::where('is_active', true)->orderBy('order')->get();
    }

    public function adminIndex()
    {
        return Testimonial::orderBy('order')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'text_ar' => 'required|string',
            'text_en' => 'required|string',
            'name_ar' => 'required|string',
            'name_en' => 'required|string',
            'role_ar' => 'required|string',
            'role_en' => 'required|string',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);
        return Testimonial::create($data);
    }

    public function update(Request $request, int $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->update($request->only([
            'text_ar', 'text_en', 'name_ar', 'name_en', 'role_ar', 'role_en', 'order', 'is_active',
        ]));
        return $testimonial;
    }

    public function destroy(int $id)
    {
        Testimonial::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
