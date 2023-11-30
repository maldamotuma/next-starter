import ResetPasswordForm from "@/components/auth/resetPassword/form";
import Title from "@/components/home/title";
import { Typography } from "@mui/material";
import Script from "next/script";
import { FunctionComponent } from "react";

interface ForgotPasswordProps {

}

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = () => {
    return (
        <>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YRJ9KDZNZ0" />
            <Script id={"google-analytics"}>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-YRJ9KDZNZ0');
                `}
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