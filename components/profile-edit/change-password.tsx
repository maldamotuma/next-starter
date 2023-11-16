import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { FormEvent, FunctionComponent } from "react";
import Title from "../home/title";
import { rulesAndMessagedType, useValidator } from "@malda/react-validator";
import { useRemoteCall } from "@/hooks/remote-call";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import { setAuthUser } from "@/redux/slices/auth";


const rules: rulesAndMessagedType = {
    rules: {
        current_password: ['required'],
        password: ['required', 'strong_password'],
        password_confirmation: ['required', 'strong_password'],
    }
}

interface ChangePasswordProps {

}

const ChangePassword: FunctionComponent<ChangePasswordProps> = () => {
    const { validate } = useValidator("change-password", rules);
    const { axios, status } = useRemoteCall();
    const router = useRouter();
    const dispatch = useAppDispatch();


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate(async () => {
            const formdata = new FormData(e.currentTarget);
            const res = await axios.post("change-password", {
                formdata,
                successMessage: "Success!! SignIn With the new Password",
                successCallBack() {
                    dispatch(setAuthUser(null));
                    router.push("/");
                },
            });
        });
    }

    return (
        <Card
            variant="outlined"
        >
            <CardContent
                id={"change-password"}
                component={"form"}
                noValidate
                onSubmit={handleSubmit}
            >
                <Title
                    primary="Change Password"
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
                <Grid container>
                    <Grid item xs={12} id="input-current_password">
                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            name="current_password"
                            label="Current Password"
                            type="password"
                            id="current_password"
                            autoComplete="password"
                        />
                    </Grid>
                    <Grid item xs={12} id="input-password">
                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12} id="input-password_confirmation">
                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            name="password_confirmation"
                            label="Confirm Password"
                            type="password"
                            id="password_confirmation"
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            // fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, minWidth: 150 }}
                            disabled={status === "pending"}
                        >
                            {
                                status === "pending" ? "Changing..." : "Change Password"
                            }
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default ChangePassword;