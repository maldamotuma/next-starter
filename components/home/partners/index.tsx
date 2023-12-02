import { FunctionComponent } from "react";
import Title from "../title";
import { Box, Container } from "@mui/material";
import { partners } from "./partners.data";
import PartnerLogo from "./partner";
import Marquee from "react-fast-marquee";

interface PartnersProps {
    
}
 
const Partners: FunctionComponent<PartnersProps> = () => {
    return (
        <div>
        <Container maxWidth="xl">
        <Title
        primary="We work with"
        secondary="Some of our loyal partners. We trusted for"
        // primaryProps={{
        //     align: "left"
        // }}
        // secondaryProps={{
        //     align: "left"
        // }}
        />
        </Container>
        <Box sx={{
            width: {
                xs: "calc(100vw - 5px) !important",
                sm: "calc(100vw - 20px) !important"
            },
            overflow: "hidden"
        }}>
        <Marquee>
            {
                partners.map(partner => (
                    <PartnerLogo
                    key={`partner-${partner}`}
                    partner={{
                        img: partner.img
                    }}
                    />
                ))
            }
        </Marquee>
        </Box>
        </div>
    );
}
 
export default Partners;