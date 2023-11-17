"use client"

import { Box, CardContent, Container, Paper, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Title from "../title";
import Tabform from "@/components/auth/tabForm";

interface ContactProps {

}

const Contact: FunctionComponent<ContactProps> = () => {
    return (
        <Container maxWidth="lg">
            <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent={"space-between"} spacing={3}>
                <Box
                    sx={{
                        flex: 1,
                        maxWidth: "500px"
                    }}
                >
                    <CardContent>
                        <Title
                            primary="Contact"
                            secondary="Get In Touch With Us"
                            primaryProps={{
                                align: "left",
                                sx: {
                                    mb: 0,
                                    pb: 0
                                }
                            }}
                            secondaryProps={{
                                align: "left",
                                sx: {
                                    mb: 0,
                                    pb: 0
                                }
                            }}
                        />
                        <Typography sx={{ my: 2 }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa laboriosam odio possimus deleniti voluptates. Sapiente ad voluptatibus commodi optio in asperiores deserunt quis, suscipit reprehenderit magnam doloribus odio eaque! Libero.
                        </Typography>
                    </CardContent>
                </Box>
                <Paper
                    sx={{
                        maxWidth: 400,
                        width: "100%"
                    }}
                >
                    <Tabform />
                </Paper>
            </Stack>
        </Container>
    );
}

export default Contact;