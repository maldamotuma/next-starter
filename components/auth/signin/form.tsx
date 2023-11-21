"use client";

import { baseURL } from "@/config/axios";
import { useRemoteCall } from "@/hooks/remote-call";
import { setAuthUser } from "@/redux/slices/auth";
import { useAppDispatch } from "@/redux/store";
import { rulesAndMessagedType, useValidator } from "@malda/react-validator";
import { GitHub, Google } from "@mui/icons-material";
import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

const rules: rulesAndMessagedType = {
  rules: {
    username: ['required'],
    password: ['required']
  }
}

interface SigninFormProps {
  modal?: boolean;
  noRedirect?: boolean;
}

const SigninForm: FunctionComponent<SigninFormProps> = ({ modal, noRedirect }) => {
  const { validate } = useValidator("login", rules);
  const { axios, status } = useRemoteCall();
  const dispatch = useAppDispatch();
  const router = useRouter();


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validate(async () => {
      const formdata = new FormData(event.currentTarget);
      await baseURL.get('/sanctum/csrf-cookie');
      const res = await axios.post("/signin", {
        formdata,
        ky: "user",
        successMessage: "SignedIn Success!",
        failMessage: "SignIn Fail",
      });
      if (res) {
        if (!noRedirect) router.push("/");
        dispatch(setAuthUser(res));
      }
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
      <Grid container sx={{ mb: 2 }}>
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
      <Divider sx={{ my: 1 }}>
        <Typography color="text.secondary">Or</Typography>
      </Divider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: 2,
          mt: 2
        }}
      >
        <Button
          startIcon={<Google />}
          onClick={() => signIn("google")}
          variant={"outlined"}
          fullWidth
        >
          SignIN With Google
        </Button>
        <Button
          startIcon={<GitHub />}
          variant={"outlined"}
          fullWidth
        >
          SignIN With Github
        </Button>
      </Box>
    </Box>
  );
}

export default SigninForm;