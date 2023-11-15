"use client";

import { baseURL } from "@/config/axios";
import { useRemoteCall } from "@/hooks/remote-call";
import { rulesAndMessagedType, useValidator } from "@malda/react-validator";
import { Box, Button, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";

const rules: rulesAndMessagedType = {
  rules: {
    email: ['required', 'email']
  }
}
interface ForgotPasswordFormProps {

}

const ForgotPasswordForm: FunctionComponent<ForgotPasswordFormProps> = () => {
  const { validate } = useValidator("forgot-password", rules);
  const { axios, status } = useRemoteCall();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validate(async () => {
      const formdata = new FormData(event.currentTarget);
      await baseURL.get('/sanctum/csrf-cookie');
      const res = await axios.post("/forgot-password", {
        formdata,
        successMessage: "We have sent You Reset Instraction to your Email!",
      });
    });
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 1, flex: 1, display: "block !important", width: "100% !important" }}
      id="forgot-password"
    >
      <Box id="input-email" style={{display: "block !important", width: "100% !important"}}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={status === "pending"}
      >
        {
          status === "pending" ?
            "Processing Reset Link..."
            :
            "Send Reset Instraction"
        }
      </Button>
      <Grid container>
        <Grid item xs>
          <Button component={Link} sx={{ textTransform: "none" }} href="/auth/signin">
            SignIn
          </Button>
        </Grid>
        <Grid item>
          <Button component={Link} sx={{ textTransform: "none" }} href="/auth/signup">
            {"Don't have an account? Sign Up"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ForgotPasswordForm;