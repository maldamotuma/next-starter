"use client";

import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";

interface SigninFormProps {
  modal?: boolean
}
 
const SigninForm: FunctionComponent<SigninFormProps> = ({modal}) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };
    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Button component={Link} sx={{textTransform: "none"}} href="/auth/forgot-password">
                    Forgot password?
                  </Button>
                </Grid>
                {
                  !modal &&
                <Grid item>
                  <Button component={Link} sx={{textTransform: "none"}} href="/auth/signup">
                    {"Don't have an account? Sign Up"}
                  </Button>
                </Grid>
                }
              </Grid>
            </Box>
    );
}
 
export default SigninForm;