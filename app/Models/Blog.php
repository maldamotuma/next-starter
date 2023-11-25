<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_active' => 'integer'
    ];

    function user()
    {
        return $this->belongsTo(User::class);
    }

    function admin()
    {
        return $this->belongsTo(Admin::class);
    }

    function cat()
    {
        return $this->belongsTo(Category::class, "category_id");
    }

    function comments()
    {
        return $this->hasMany(Comment::class)
            ->where("replay_id", null)
            ->with("user", "admin", "replays");
    }
}
