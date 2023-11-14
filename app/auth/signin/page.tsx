import SigninForm from "@/components/auth/signin/form";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";

interface SignInProps {
    
}
 
const SignIn: FunctionComponent<SignInProps> = () => {
    
      
    return (
        <div>
            <Typography component="h1" variant="h5" align="center">
              Sign in
            </Typography>
            <SigninForm />
        </div>
    );
}
 
export default SignIn;