"use client"

import { Box, Container, Typography, alpha, useTheme } from "@mui/material";
import { FunctionComponent } from "react";
import ServiceCard from "./ServiceCard";
import Title from "../title";
import { services } from "./services-data";

interface ServicesProps {

}

const Services: FunctionComponent<ServicesProps> = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "block",
                // bgcolor: alpha(theme.palette.mode === "light" ? blue[50] : blue[900], theme.palette.mode === "light" ? .5 : .15),
                // pt: 10,
                // pb: 15,
                width: "100%"
            }}
        >
            <Container maxWidth="xl">
                <Title
                    primary={"How Can We Help"}
                    secondary={"Explore, Learn, and Innovate with Tech-Scan"}
                    secondaryProps={{
                        sx: {
                            mb: 0,
                        }
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap"
                    }}
                >
                    {
                        services.map((crd, i) => (
                            <Box
                                key={`service-card-${crd.title}`}
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "50%",
                                        md: "33.33333%"
                                    },
                                    p: 1,
                                    boxSizing: "border-box"
                                }}
                            >
                                <ServiceCard service={{ ...crd, image: `/services/s${i + 1}.jpg` }} active={i === 0} />
                            </Box>
                        ))
                    }
                </Box>
            </Container>
        </Box>
    );
}

export default Services;