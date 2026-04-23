<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'slug', 'title_ar', 'title_en', 'excerpt_ar', 'excerpt_en',
        'content_ar', 'content_en', 'image', 'publish_date', 'is_published',
        'meta_title', 'meta_description', 'keywords', 'img_alt',
        'canonical_url', 'tags', 'og_title', 'og_description', 'schema_markup'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'publish_date' => 'date',
    ];
}
