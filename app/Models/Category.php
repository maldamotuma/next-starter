<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $casts = [
        'section_id' => 'integer',
        'parent_id' => 'integer',
        'is_active' => 'integer'
    ];
}
