import { Box, Container, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import ServiceCard from "./ServiceCard";
import Title from "../title";

interface ServicesProps {
    
}
 
const Services: FunctionComponent<ServicesProps> = () => {
    return (
        <Container maxWidth="xl">
            <Title
            primary="SomeTitle Goes  Here"
            secondary="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            />
            <Box
            sx={{
                display: "flex",
                flexWrap: "wrap"
            }}
            >
            {
                [1,2,3,4,5,6].map(crd => (
                    <Box
                    key={`service-card-${crd}`}
                    sx={{
                        width: "33.33333%",
                        p: 1,
                        boxSizing: "border-box"
                    }}
                    >
                        <ServiceCard />
                    </Box>
                ))
            }
            </Box>
        </Container>
    );
}
 
export default Services;