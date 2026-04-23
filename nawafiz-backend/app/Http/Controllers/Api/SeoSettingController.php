<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SeoSetting;
use Illuminate\Http\Request;

class SeoSettingController extends Controller
{
    // Public — returns all SEO scripts to inject
    public function index()
    {
        $settings = SeoSetting::all()->pluck('value', 'key');
        return response()->json($settings);
    }

    // Admin — get all
    public function adminIndex()
    {
        return SeoSetting::all();
    }

    // Admin — update (batch)
    public function update(Request $request)
    {
        $data = $request->validate([
            'settings' => 'required|array',
            'settings.*.key' => 'required|string',
            'settings.*.value' => 'nullable|string',
        ]);

        foreach ($data['settings'] as $item) {
            SeoSetting::updateOrCreate(
                ['key' => $item['key']],
                ['value' => $item['value'] ?? '']
            );
        }

        return SeoSetting::all();
    }
}
