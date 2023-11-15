import { Box, Container, Stack } from "@mui/material";
import { FunctionComponent } from "react";
import HeroTitle from "./title";
import HeroImage from "./image";

interface HeroProps {

}

const Hero: FunctionComponent<HeroProps> = () => {
    return (
        <Container maxWidth="xl" sx={{py: 15}}>
            <Stack direction="row" alignItems="center" spacing={10}>
                <Box sx={{ flex: 1 }}>
                    <HeroTitle />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <HeroImage />
                </Box>
            </Stack>
        </Container>
    );
}

export default Hero;