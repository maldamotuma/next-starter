<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Bookmark extends Pivot
{
    protected $guarded = [];

    protected $table = "bookmark";

    protected $casts = [
        'blog_id' => 'integer',
        'user_id' => 'integer',
        'admin_id' => 'integer'
    ];
}
