"use client";

import { baseURL } from "@/config/axios";
import { useRemoteCall } from "@/hooks/remote-call";
import { rulesAndMessagedType, useValidator } from "@malda/react-validator";
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";

const rules: rulesAndMessagedType = {
  rules: {
    username: ['required'],
    password: ['required']
  }
}

interface SigninFormProps {
  modal?: boolean
}

const SigninForm: FunctionComponent<SigninFormProps> = ({ modal }) => {
  const { validate } = useValidator("login", rules);
  const { axios, status } = useRemoteCall();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validate(async () => {
      const formdata = new FormData(event.currentTarget);
      await baseURL.get('/sanctum/csrf-cookie');
      const res = await axios.post("/login", {
        formdata,
        successMessage: "SignedIn Success!",
        failMessage: "SignIn Fail"
      })
    });
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} id="login">
      <div id="input-username">
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
        />
      </div>
      <div id="input-password">
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </div>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={status === "pending"}
      >
        {
          status === "pending" ? "Signing In..." :
            "Sign In"
        }
      </Button>
      <Grid container>
        <Grid item xs>
          <Button component={Link} sx={{ textTransform: "none" }} href="/auth/forgot-password">
            Forgot password?
          </Button>
        </Grid>
        {
          !modal &&
          <Grid item>
            <Button component={Link} sx={{ textTransform: "none" }} href="/auth/signup">
              {"Don't have an account? Sign Up"}
            </Button>
          </Grid>
        }
      </Grid>
    </Box>
  );
}

export default SigninForm;