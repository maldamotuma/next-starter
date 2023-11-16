import { Box } from "@mui/material";
import { FunctionComponent } from "react";

interface PartnerLogoProps {
    partner: {
        img: string;
        url?: string;
    }
}
 
const PartnerLogo: FunctionComponent<PartnerLogoProps> = ({partner}) => {
    return (
        <>
        <Box
        component={"img"}
        src={partner.img}
        height={"50px"}
        sx={{
            mx: 3,
            filter: "grayscale(100%)",
            "&:hover": {
            filter: "grayscale(0)",
            }
        }}
        />
        </>
    );
}
 
export default PartnerLogo;