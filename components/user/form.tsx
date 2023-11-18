"use client"

import { useRemoteCall } from "@/hooks/remote-call";
import { rulesAndMessagedType, useValidator } from "@malda/react-validator";
import { Radio, FormLabel, RadioGroup, Box, Button, FormControl, FormControlLabel, Grid, TextField } from "@mui/material";
import { FormEvent, FunctionComponent } from "react";
import { UserType } from "./types";

const rules: rulesAndMessagedType = {
    rules: {
        first_name: ['required', 'name'],
        last_name: ['required', 'name'],
        username: ['required'],
        email: ['required', 'email'],
    }
}
interface UserFormProps {
    alterUsers(user: UserType, edit?: boolean): void;
    close(): void;
    user: UserType | null;
}

const UserForm: FunctionComponent<UserFormProps> = ({alterUsers, close, user}) => {
    const { validate } = useValidator("add-user", rules);
    const { axios, status } = useRemoteCall();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validate(async () => {
            const formdata = new FormData(event.currentTarget);
            const res = await axios.post(user ? `update-user/${user.id}` : "/add-user", {
                formdata,
                ky: "user",
            });
            if (res) {
                close();
                alterUsers(res, user ? true : false);
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
                                defaultValue={user?.first_name}
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
                                defaultValue={user?.last_name}
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
                            defaultValue={user?.username}
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
                            defaultValue={user?.email}
                            />
                    </Grid>
                    <Grid item xs={12} md={6} id="input-gender">
                        <FormControl>
                            <FormLabel id="gender-radio">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="gender-radio"
                                defaultValue={user ? user.gender : "female"}
                                name="gender"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
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

export default UserForm;