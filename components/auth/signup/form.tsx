"use client"

import axios, { baseURL } from "@/config/axios";
import { rulesAndMessagedType, useValidator } from "@malda/react-validator";
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { FormEvent, FunctionComponent } from "react";

const rules: rulesAndMessagedType = {
  rules: {
    first_name: ['required', 'name'],
    last_name: ['required', 'name'],
    email: ['required', 'email'],
    password: ['required', 'strong_password'],
    confirm_password: ['required', 'strong_password'],
  }
}
interface SignUpFormProps {
  modal?: boolean
}
 
const SignUpForm: FunctionComponent<SignUpFormProps> = ({modal}) => {
  const {validate} = useValidator("signup-register", rules);
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validate(async () => {
          const formdata = new FormData(event.currentTarget);
          await baseURL.get('/sanctum/csrf-cookie');
          const res = await axios.post("/register", {
            formdata,
            successMessage: "SignedUp Success!",
            failMessage: "SignUp Fail"
          });
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
              <Grid item xs={12} md={6} id="input-confirm_password">
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="new-password"
                />
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
            >
              Sign Up
            </Button>
            {
              !modal &&
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Button component={Link} sx={{textTransform: "none"}} href="/auth/signin">
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