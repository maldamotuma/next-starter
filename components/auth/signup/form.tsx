"use client"

import { baseURL } from "@/config/axios";
import { useRemoteCall } from "@/hooks/remote-call";
import { setAuthUser } from "@/redux/slices/auth";
import { useAppDispatch } from "@/redux/store";
import { rulesAndMessagedType, useValidator } from "@malda/react-validator";
import { Radio, FormLabel, RadioGroup, Box, Button, Checkbox, FormControl, FormControlLabel, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, FunctionComponent } from "react";

const rules: rulesAndMessagedType = {
  rules: {
    first_name: ['required', 'name'],
    last_name: ['required', 'name'],
    username: ['required'],
    email: ['required', 'email'],
    password: ['required', 'strong_password'],
    password_confirmation: ['required', 'strong_password'],
  }
}
interface SignUpFormProps {
  modal?: boolean
}

const SignUpForm: FunctionComponent<SignUpFormProps> = ({ modal }) => {
  const { validate } = useValidator("signup-register", rules);
  const dispatch = useAppDispatch();
  const { axios, status } = useRemoteCall();
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validate(async () => {
      const formdata = new FormData(event.currentTarget);
      await baseURL.get('/sanctum/csrf-cookie');
      const res = await axios.post("/signup", {
        formdata,
        ky: "user",
        successMessage: "SignUp Success!",
        failMessage: "SignUp Fail"
      });
      if (res) {
        dispatch(setAuthUser(res));
        router.push("/");
      }
    });
  };
  return (
    <>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} id="signup-register">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <div id="input-first_name">
              <TextField
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div id="input-last_name">
              <TextField
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
              />
            </div>
          </Grid>
          <Grid item xs={12} id="input-username">
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12} id="input-email">
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12} md={6} id="input-password">
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12} md={6} id="input-password_confirmation">
            <TextField
              required
              fullWidth
              name="password_confirmation"
              label="Confirm Password"
              type="password"
              id="password_confirmation"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12} md={6} id="input-gender">
            <FormControl>
              <FormLabel id="gender-radio">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="gender-radio"
                defaultValue="female"
                name="gender"
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={status === "pending"}
        >
          {
            status === "pending" ? "Signing Up..." : "Sign Up"
          }
        </Button>
        {
          !modal &&
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button component={Link} sx={{ textTransform: "none" }} href="/auth/signin">
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        }
      </Box>
    </>
  );
}

export default SignUpForm;