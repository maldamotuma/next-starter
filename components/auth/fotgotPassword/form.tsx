"use client";

import { Box, Button, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";

interface ForgotPasswordFormProps {

}
 
const ForgotPasswordForm: FunctionComponent<ForgotPasswordFormProps> = () => {
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Reset Instraction
              </Button>
              <Grid container>
                <Grid item xs>
                  <Button component={Link} sx={{textTransform: "none"}} href="/auth/signin">
                    SignIn
                  </Button>
                </Grid>
                <Grid item>
                  <Button component={Link} sx={{textTransform: "none"}} href="/auth/signup">
                    {"Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
    );
}
 
export default ForgotPasswordForm;