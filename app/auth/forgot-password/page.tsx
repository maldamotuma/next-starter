import ForgotPasswordForm from "@/components/auth/fotgotPassword/form";
import { Typography } from "@mui/material";
import { Metadata } from "next";
import Script from "next/script";
import { FunctionComponent } from "react";

export const metadata: Metadata = {
    title: "Reset Your Password at Tech-Scan: Regain Access to Your Tech Journey",
    description: "Forgot your password? No worries. Reset it securely at Tech-Scan. Regain access to premium content on AI, full-stack development, React, Next.js, Laravel, Python, Machine Learning, and Deep Learning. Stay connected with the vibrant tech community.",
    keywords: [
        "Tech-Scan",
        "Forgot Password",
        "Reset Password",
        "Password Recovery",
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

interface ForgotPasswordProps {

}

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = () => {


    return (
        <div>
            <Script  id="forgorPassword-packages-lnk"async src="https://www.googletagmanager.com/gtag/js?id=G-Q7PPML4EDC" />
            <Script id="forgorPassword">
                {
                    `
          window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-Q7PPML4EDC');
        `
                }
            </Script>
            <Typography component="h1" variant="h5">
                Forgot Password
            </Typography>
            <ForgotPasswordForm />
        </div>
    );
}

export default ForgotPassword;