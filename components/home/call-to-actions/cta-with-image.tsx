"use client";

import { Box, Button, Container, FormHelperText, Paper, TextField } from "@mui/material";
import { FunctionComponent } from "react";
import Title from "../title";
import { ArrowForward, Mail } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { blue, indigo } from "@mui/material/colors";
import { useEmailSubscribe } from "@/hooks/subscribecta";

interface CTAWithImageProps {

}

const CTAWithImage: FunctionComponent<CTAWithImageProps> = () => {
    const {
        handleChange,
        handleSubmit,
        loading
    } = useEmailSubscribe();

    return (
        <Container maxWidth="xl"
            sx={{
                position: "relative"
            }}
        >
            <Paper
                sx={{
                    p: 5,
                    width: {
                        xs: "calc(100% - 20px)",
                        md: "75%",
                        lg: "50%"
                    },
                    zIndex: 1,
                    position: "relative",
                    mt: 15,
                    mb: 3,
                    bgcolor: indigo[700],
                    color: "#ffffff"
                }}
                component={"form"}
                onSubmit={handleSubmit}
            >
                <Title
                    primary="Stay Uptodate With Use"
                    secondary="Lorem ipsum dolor sit amet consectetur adipisicing elit. udantium porro voluptas tempore distinctio sint! Voluptas porro odio officia perferendis odit iure cumque molestias id."
                    primaryProps={{
                        align: "left"
                    }}
                    secondaryProps={{
                        align: "left",
                        fontSize: "1.1em",
                        fontWeight: 400,
                        color: indigo[100],
                        sx: {
                            mb: 1
                        }
                    }}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label={"Email"}
                    onChange={handleChange}
                    placeholder="youremail@mail.mail"
                    sx={{
                        '& input': {
                            color: '#ffffff'
                        },
                        '& label': {
                            color: "#ffffff"
                        },
                        '& label.Mui-focused': {
                            color: '#ffffff',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: '#ffffff',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#ffffff',
                            },
                            '&:hover fieldset': {
                                borderColor: '#ffffff',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#ffffff',
                            },
                        },
                    }}
                    InputProps={{
                        endAdornment: <Mail sx={{ color: "#ffffff" }} />,
                    }}
                />
                <FormHelperText sx={{ color: "#ffffff" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim debitis maxime sunt molestiae cupiditate hic!
                </FormHelperText>
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
            </Paper>
            <Box
                component={"img"}
                src="/ca.jpg"
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 2,
                    width: {
                        xs: "80%",
                        md: "70%"
                    }
                }}
            />
        </Container>
    );
}

export default CTAWithImage;