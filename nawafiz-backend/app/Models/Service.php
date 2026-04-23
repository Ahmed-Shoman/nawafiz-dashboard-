<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'slug', 'title_ar', 'title_en', 'short_desc_ar', 'short_desc_en',
        'long_desc_ar', 'long_desc_en', 'features_ar', 'features_en',
        'image', 'icon', 'order', 'is_active',
        'meta_title', 'meta_description', 'keywords', 'img_alt',
        'canonical_url', 'tags', 'og_title', 'og_description', 'schema_markup'
    ];

    protected $casts = [
        'features_ar' => 'array',
        'features_en' => 'array',
        'is_active' => 'boolean',
    ];
}
