<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $fillable = ['key', 'content', 'order', 'is_active'];

    protected $casts = [
        'content' => 'array',
        'is_active' => 'boolean',
    ];
}
