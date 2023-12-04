import SigninForm from "@/components/auth/signin/form";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Sign In to Tech-Scan: Your Gateway to Exclusive Tech Insights",
    description: "Log in to your Tech-Scan account for access to premium content on AI, full-stack development, React, Next.js, Laravel, Python, Machine Learning, and Deep Learning. Stay connected with the vibrant tech community.",
    keywords: [
        "Tech-Scan",
        "Sign In",
        "Login",
        "AI",
        "Full-stack Development",
        "React",
        "Next.js",
        "Laravel",
        "Python",
        "Machine Learning",
        "Deep Learning",
        "Tech Community"
    ]
}


interface SignInProps {

}

const SignIn: FunctionComponent<SignInProps> = () => {


    return (
        <div>
            <Script id="signin-lnk" async src="https://www.googletagmanager.com/gtag/js?id=G-Q7PPML4EDC" />
      <Script id="signin">
        {
          `
          window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-Q7PPML4EDC');
        `
        }
      </Script>
            <Typography component="h1" variant="h5" align="center">
                Sign in
            </Typography>
            <SigninForm />
        </div>
    );
}

export default SignIn;