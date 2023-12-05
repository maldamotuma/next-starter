import SigninForm from "@/components/auth/signin/form";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";
import Script from "next/script";
import { FunctionComponent } from "react";

interface SignInProps {

}

const SignIn: FunctionComponent<SignInProps> = () => {


    return (
        <div>
            <Script id={"ggl-lnk"} async src="https://www.googletagmanager.com/gtag/js?id=G-YRJ9KDZNZ0" />
            <Script id={"google-analytics"}>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-YRJ9KDZNZ0');
                `}
            </Script>
            <Typography component="h1" variant="h5" align="center">
                Sign in
            </Typography>
            <SigninForm />
        </div>
    );
}

export default SignIn;