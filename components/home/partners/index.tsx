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
                    primary="Our Tech Toolbox"
                    secondary="Discover the Tools and Technologies I Master for Your Digital Success!"
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
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,1,8].map(lg => (
                            <PartnerLogo
                                key={`partner-${lg}`}
                                partner={{
                                    img: `/logos/logo${lg}.jpg`
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