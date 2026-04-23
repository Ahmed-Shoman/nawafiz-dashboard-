<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = ['text_ar', 'text_en', 'name_ar', 'name_en', 'role_ar', 'role_en', 'order', 'is_active'];

    protected $casts = ['is_active' => 'boolean'];
}
