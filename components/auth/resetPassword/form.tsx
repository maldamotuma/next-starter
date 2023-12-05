"use client";

import { baseURL } from "@/config/axios";
import { useRemoteCall } from "@/hooks/remote-call";
import { setAuthUser } from "@/redux/slices/auth";
import { useAppDispatch } from "@/redux/store";
import { rulesAndMessagedType, useValidator } from "@malda/react-validator";
import { Box, Button, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FunctionComponent } from "react";

const rules: rulesAndMessagedType = {
    rules: {
        password: ['required', 'strong_password'],
        password_confirmation: ['required', 'strong_password']
    }
}

interface ResetPasswordFormProps {
    modal?: boolean
}

const ResetPasswordForm: FunctionComponent<ResetPasswordFormProps> = ({ modal }) => {
    const { validate } = useValidator("reset-password", rules);
    const { axios, status } = useRemoteCall();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validate(async () => {
            const formdata = new FormData(event.currentTarget);
            await baseURL.get('/sanctum/csrf-cookie');
            const res = await axios.post("/reset-password", {
                formdata,
                ky: "user",
                successMessage: "Password Resseted! Signin with the new password",
                successCallBack() {
                    router.push("/auth/signin")
                },
            });
            if (res) dispatch(setAuthUser(res));
        });
    };
    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} id="reset-password">
            <div id="input-password">
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    autoFocus
                />
            </div>
            <div id="input-password_confirmation">
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password_confirmation"
                    label="Confirm Password"
                    name="password_confirmation"
                    autoComplete="new-password"
                    type="password"
                />
            </div>
            <input
                value={searchParams.get("token") || ""}
                readOnly
                type="hidden"
                name="token"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={status === "pending"}
            >
                {
                    status === "pending" ? "Creating new password..." :
                        "Create New Password"
                }
            </Button>
        </Box>
    );
}

export default ResetPasswordForm;