<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['title_ar', 'title_en', 'desc_ar', 'desc_en', 'image', 'order', 'is_active'];

    protected $casts = ['is_active' => 'boolean'];
}
