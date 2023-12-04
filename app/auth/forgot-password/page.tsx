import ForgotPasswordForm from "@/components/auth/fotgotPassword/form";
import { Typography } from "@mui/material";
import { Metadata } from "next";
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
            <Typography component="h1" variant="h5" align="center">
                Forgot Password
            </Typography>
            <ForgotPasswordForm />
        </div>
    );
}

export default ForgotPassword;