<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_active' => 'integer',
        'user_id' => 'integer',
        'admin_id' => 'integer',
        'blog_id' => 'integer',
        'replay_id' => 'integer'
    ];

    function user()
    {
        return $this->belongsTo(User::class);
    }

    function admin()
    {
        return $this->belongsTo(Admin::class);
    }

    function replays()
    {
        return $this->hasMany(Comment::class, "replay_id")->with("user", "admin");
    }
}
