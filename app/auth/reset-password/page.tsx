import ResetPasswordForm from "@/components/auth/resetPassword/form";
import Title from "@/components/home/title";
import { Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { Metadata } from "next";

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
            <Title
                primary="Reset Passsword"
                secondary="Create New Password"
            />
            <ResetPasswordForm />
        </>
    );
}

export default ForgotPassword;