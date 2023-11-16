"use client";
import { Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { FormEvent, FunctionComponent } from "react";
import Title from "../home/title";
import { rulesAndMessagedType, useValidator } from "@malda/react-validator";
import { useRemoteCall } from "@/hooks/remote-call";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setAuthUser } from "@/redux/slices/auth";

const rules: rulesAndMessagedType = {
    rules: {
        first_name: ['required', 'name'],
        last_name: ['required', 'name'],
        email: ['required', 'email'],
        phone: ['required', "eth_phone"],
        username: ['required'],
    }
}

interface BasicEditProps {

}

const BasicEdit: FunctionComponent<BasicEditProps> = () => {
    const { validate } = useValidator("update-profile", rules);
    const { axios, status } = useRemoteCall();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate(async () => {
            const formdata = new FormData(e.currentTarget);
            const res = await axios.post("update-profile", {
                formdata,
                ky: "user"
            });
            if (res) dispatch(setAuthUser(res))
        });
    }
    return (
        <Card
            variant="outlined"
        >
            <CardContent>
                <Title
                    primary="Edit Profile"
                    primaryProps={{
                        align: "left",
                        fontWeight: 500,
                        fontSize: "1.5em"
                    }}
                    secondaryProps={{
                        sx: {
                            mb: 0,
                            pb: 0
                        }
                    }}
                />
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} id="update-profile">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <div id="input-first_name">
                                <TextField
                                    defaultValue={user?.first_name}
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
                                    defaultValue={user?.last_name}
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
                                defaultValue={user?.username}
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
                                defaultValue={user?.email}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12} id="input-phone">
                            <TextField
                                defaultValue={user?.phone}
                                required
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                autoComplete="phone"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} id="input-gender">
                            <FormControl>
                                <FormLabel id="gender-radio">Gender</FormLabel>
                                <RadioGroup
                                    aria-labelledby="gender-radio"
                                    defaultValue={user?.gender}
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
                        // fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, minWidth: 150 }}
                        disabled={status === "pending"}
                    >
                        {
                            status === "pending" ? "Updating..." : "Update"
                        }
                    </Button>
                </Box>

            </CardContent>

        </Card>
    );
}

export default BasicEdit;