<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Blog extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_active' => 'integer',
        'admin_id' => 'integer',
        'user_id' => 'integer',
        'category_id' => 'integer'
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

    function getIsFavoriteAttribute()
    {
        if (Auth::check()) {
            return Bookmark::where([
                'user_id' => Auth::id(),
                'blog_id' => $this->id
            ])->exists() ? 1 : 0;
        } else if (Auth::guard('admin')->check()) {
            return Bookmark::where([
                'admin_id' => Auth::guard('admin')->id(),
                'blog_id' => $this->id
            ])->exists() ? 1 : 0;
        }
        return 0;
    }
}
