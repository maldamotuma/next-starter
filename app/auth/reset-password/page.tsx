import ResetPasswordForm from "@/components/auth/resetPassword/form";
import Title from "@/components/home/title";
import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

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