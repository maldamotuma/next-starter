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
import { AdminType } from "./types";

const rules: rulesAndMessagedType = {
    rules: {
        first_name: ['required', 'name'],
        last_name: ['required', 'name'],
        username: ['required'],
        email: ['required', 'email'],
    }
}
interface AdminFormProps {
    alterAdmins(admin: AdminType, edit?: boolean): void;
    close(): void;
    admin: AdminType | null;
}

const AdminForm: FunctionComponent<AdminFormProps> = ({alterAdmins, close, admin}) => {
    const { validate } = useValidator("add-admin", rules);
    const { axios, status } = useRemoteCall();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validate(async () => {
            const formdata = new FormData(event.currentTarget);
            const res = await axios.post(admin ? `update-admin/${admin.id}` : "/add-admin", {
                formdata,
                ky: "admin",
            });
            if (res) {
                close();
                alterAdmins(res, admin ? true : false);
            }
        });
    };
    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} id="add-admin">
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
                                defaultValue={admin?.first_name}
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
                                defaultValue={admin?.last_name}
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
                            defaultValue={admin?.username}
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
                            defaultValue={admin?.email}
                            />
                    </Grid>
                    <Grid item xs={12} md={6} id="input-gender">
                        <FormControl>
                            <FormLabel id="gender-radio">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="gender-radio"
                                defaultValue={admin ? admin.gender : "female"}
                                name="gender"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} id="input-is_super">
                        <FormControl>
                            <FormLabel id="is_super-radio">Type</FormLabel>
                            <RadioGroup
                                aria-labelledby="is_super-radio"
                                defaultValue={admin ? admin.is_super : 0}
                                name="is_super"
                            >
                                <FormControlLabel value={1} control={<Radio />} label="Super Admin" />
                                <FormControlLabel value={0} control={<Radio />} label="Admin" />
                            </RadioGroup>
                        </FormControl>
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
                        status === "pending" ? "Submitting..." : "Submit"
                    }
                </Button>
            </Box>
        </>
    );
}

export default AdminForm;