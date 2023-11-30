"use client"

import { useEmailSubscribe } from "@/hooks/subscribecta";
import { ArrowForward, Mail } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import { FunctionComponent } from "react";

interface SubscribeCtaProps {

}

const SubscribeCta: FunctionComponent<SubscribeCtaProps> = () => {
    const {
        handleChange,
        handleSubmit,
        loading
    } = useEmailSubscribe();

    return (
        <Card
            variant={"outlined"}
        >
            <CardHeader
                title={"Do You Love The Blog!"}
                subheader={"Subscribe to get nofitification when such blogs created"}
                sx={{
                    pb: 0
                }}
            />
            <CardContent
                component={"form"}
                onSubmit={handleSubmit}
                sx={{
                    pt: 0
                }}
            >
                <TextField
                    margin="normal"
                    fullWidth
                    label={"Email"}
                    onChange={handleChange}
                    placeholder="youremail@mail.mail"
                    InputProps={{
                        endAdornment: <Mail sx={{ color: "divider" }} />,
                    }}
                />
                <LoadingButton
                    variant="contained"
                    disableElevation
                    endIcon={<ArrowForward />}
                    sx={{
                        mt: 2
                    }}
                    loading={loading}
                    type={"submit"}
                >
                    Subscribe
                </LoadingButton>
            </CardContent>
        </Card>
    );
}

export default SubscribeCta;