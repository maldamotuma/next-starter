import ForgotPasswordForm from "@/components/auth/fotgotPassword/form";
import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

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