import SignUpForm from "@/components/auth/signup/form";
import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface SignUpProps {
    
}
 
const SignUp: FunctionComponent<SignUpProps> = () => {
    return (
        <>
        <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <SignUpForm />
        </>
    );
}
 
export default SignUp;