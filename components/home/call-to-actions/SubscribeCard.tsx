"use client"

import { useEmailSubscribe } from "@/hooks/subscribecta";
import { ArrowForward, Mail } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, CardHeader, Container, Paper, TextField, alpha } from "@mui/material";
import { blue } from "@mui/material/colors";
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
        <Container maxWidth={"xl"} sx={{
            // bgcolor: alpha(blue[500], .05),
            py: 4,
            display: "flex",
            gap: 15,
            alignItems: "center",
            justifyContent: "center",
            // border: 1,
            // borderColor: "divider",
            borderRadius: 3
        }}>
            <Card
                variant={"outlined"}
                sx={{
                    border: 0,
                    flex: 1,
                    maxWidth: "sm"
                }}
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
            <Box
                component={"img"}
                alt={""}
                src={"/bulb.svg"}
                sx={{
                    height: 250,
                    display: {
                        xs: "none",
                        md: "block"
                    },
                }}
            />
        </Container>
    );
}

export default SubscribeCta;