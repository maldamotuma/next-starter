<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

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
        ResetPassword::createUrlUsing(function (User $user, string $token) {
            // if ($user instanceof Admin) {
            //     return env("ADMIN_URL") . '/auth/reset-password?token=' . $token;
            // }
            // return env("USER_URL") . '/en/auth/reset-password?token=' . $token;
            return 'http://localhost:3000/auth/reset-password?token=' . $token;
        });

        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            $urp = parse_url($url);
            $normalized_url = Str::after($urp['path'], "/email/verify/");
            $id = Str::before($normalized_url, '/');
            $hash = Str::after($normalized_url, '/');
            $lnk = "http://localhost:3000/verify-email?a={$id}&b={$hash}&" .$urp['query'];
            return (new MailMessage)
                ->subject('Verify Email Address')
                ->line('Click the button below to verify your email address.')
                ->action('Verify Email Address', $lnk);
            // $lnk = "";
            // if ($notifiable instanceof Admin) {
            //     $lnk = env("ADMIN_URL") . "/eth";
            //     // $lnk = env("ADMIN_URL") . "/email-verification" . Str::after($url, "/email/verify");
            // }else {
            //     $lnk = env("USER_URL") . "/en";
            //     // $lnk = env("USER_URL") . "/email-verification" . Str::after($url, "/email/verify");
            // }
            // return (new MailMessage)
            //     ->subject('Please verify your email address')
            //     ->view('mails.email-verification', compact('lnk', 'notifiable'));
        });
    }
}
