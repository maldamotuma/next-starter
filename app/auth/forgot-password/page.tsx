import ForgotPasswordForm from "@/components/auth/fotgotPassword/form";
import { Typography } from "@mui/material";
import Script from "next/script";
import { FunctionComponent } from "react";

interface ForgotPasswordProps {

}

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = () => {


    return (
        <div>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YRJ9KDZNZ0" />
            <Script id={"google-analytics"}>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-YRJ9KDZNZ0');
                `}
            </Script>
            <Typography component="h1" variant="h5" align="center">
                Forgot Password
            </Typography>
            <ForgotPasswordForm />
        </div>
    );
}

export default ForgotPassword;