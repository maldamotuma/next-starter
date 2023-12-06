<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Email</title>
    <style>
        .body {
            background-color: #bbdefb;
            padding: 5px;
        }

        .card-media {
            border-radius: 10px 10px 0 0;
        }

        .card-media img {
            width: 100%;
            border-radius: 10px;
        }

        .card {
            background-color: #ffffff;
            color: #222222;
            border-radius: 10px;
            padding-bottom: 30px;
        }

        .container {
            display: block;
            max-width: 600px;
            margin: 100px auto;
        }

        .caption {
            text-align: center;
            margin: 0;
            padding: 10px;
            color: #403c3c
        }

        .card-content {
            padding: 15px 30px;
            padding-top: 0;
        }

        p {
            font-size: 18px;
            line-height: 24px;
        }

        li {
            font-size: 18px;
            line-height: 24px;
            margin-bottom: 10px;
        }

        .title {
            text-align: center;
            font-size: 25px;
            font-weight: 700;
            margin-bottom: 50px;
            margin-top: 30px;
        }

        .subtitle {
            margin: 0;
            padding: 0;
            margin-top: 5px;
            text-align: center;
            color: #555555;
            font-size: 20px;
            font-weight: 500;
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .avatar img {
            width: 50px;
            aspect-ratio: 1/1;
            border-radius: 50%;
        }

        .card-header .header {
            font-size: 18px;
            font-weight: 700;
            padding-bottom: 2px;
        }

        .card-header .subheader {
            color: #3f3d3d
        }

        .btn {
            text-decoration: none;
            color: inherit;
            padding: 15px 30px;
            text-transform: uppercase;
            font-weight: 700;
            font-size: 20px;
            display: inline-block;
        }

        .btn.btn-primary {
            background-color: #1976d2;
            color: #ffffff;
            border-radius: 10px;
        }

        .btn.btn-primary:hover {
            background-color: #0d47a1;
        }

        .gutter {
            margin: 10px 0 !important;
        }

        .mb-0 {
            margin-bottom: 0;
        }

        .pt {
            padding-top: 20px;
        }

        .pb {
            padding-bottom: 20px;
        }

        .logo {
            height: 50px;
            display: block;
            margin: auto;
        }
    </style>
</head>
<body>
    <div class="body">
        <div class="container">
            <img src="{{env('APP_URL')}}/logo-dark.png" class="logo" />
            <p class="caption">Tech-Scan.com</p>
            <div class="card">
                <div class="card-content pt">
                    <h1 class="title mb-0">
                        Verify Your Email Address
                    </h1>
                    <h2 class="subtitle pb">
                        Complete Your Registration
                    </h2>
                    <div class="card-media">
                        <img src="{{env('APP_URL')}}/mail/banner.avif" />
                    </div>
                    <p>Dear {{$user->first_name}} {{$user->last_name}},</p>
                    <p>
                        Thank you for signing up for Tech-Scan! We're excited to have you on board as a member of our
                        community. Before you can fully access all the features and benefits of our platform, we kindly ask
                        you to verify your email address.
                    </p>
                    <p>To complete the verification, Click on the following link:</p>
                    <a class="btn btn-primary gutter" href="{{$link}}">
                        Verify Email
                    </a>
                    <p>
                        By verifying your email address, you will gain full access to our blog, community platform, and
                        exclusive member benefits. You'll be able to engage in discussions, participate in events, and
                        receive personalized content recommendations tailored to your interests and goals.
                    </p>
                    <p>
                        Thank you for joining Tech-Scan! We look forward to your active participation in our
                        community. Together, we can explore the exciting world of full stack development and AI.
                    </p>
                    <div class="ending">
                        <p>
                            Happy coding and exploring!
                        </p>
                        <p>
                            Best regards,
                        </p>
                    </div>
                    <div class="card-header">
                        <div class="avatar">
                            <img src="avatar.jpeg" />
                        </div>
                        <div class="card-header-content">
                            <div class="header">Malda Motuma</div>
                            <div class="subheader">Tech-Scan Founder and Owner</div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="caption">copy right 2023</p>
        </div>
    </div>
</body>

</html>