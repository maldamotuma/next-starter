<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Str;


class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            $urp = parse_url($url);
            $normalized_url = Str::after($urp['path'], "/email/verify/");
            $id = Str::before($normalized_url, '/');
            $hash = Str::after($normalized_url, '/');
            $lnk = "/verify-email?a={$id}&b={$hash}&" . $urp['query'];
            $link = "";
            if ($notifiable instanceof Admin) {
                $link = env("ADMIN_URL") . $lnk;
            } else {
                $link = env("USER_URL") . $lnk;
            }
            $user = $notifiable;
            return (new MailMessage)
                ->subject('Please verify your email address')
                ->view('mails.verify-email', compact('link', 'user'));
        });
    }
}
