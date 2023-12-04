import ResetPasswordForm from "@/components/auth/resetPassword/form";
import Title from "@/components/home/title";
import { Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Create New Password",
    description: "",
    keywords: []
}

interface ForgotPasswordProps {

}

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = () => {
    return (
        <>
        <Script id="forgot-password-lnk" async src="https://www.googletagmanager.com/gtag/js?id=G-Q7PPML4EDC" />
      <Script id="forgot-password">
        {
          `
          window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-Q7PPML4EDC');
        `
        }
      </Script>
            <Title
                primary="Reset Passsword"
                secondary="Create New Password"
            />
            <ResetPasswordForm />
        </>
    );
}

export default ForgotPassword;