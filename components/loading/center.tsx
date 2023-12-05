import { server_url } from "@/config/variables";
import { Box, Container } from "@mui/material";
import { FunctionComponent } from "react";

interface CenterLoadingProps {

}

const CenterLoading: FunctionComponent<CenterLoadingProps> = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: {
                    xs: "column",
                    sm: "row"
                }
            }}
        >
            <Box
                component={"img"}
                src="/ldng.svg"
                alt={""}
                sx={{
                    width: "100%",
                    maxWidth: 150
                }}
            />
            <Box
                component={"img"}
                src={`${server_url}/logo/logo-light-large.png`}
                alt={""}
                sx={{
                    width: "100%",
                    display: "block",
                    maxWidth: 250
                }}
            />
        </Box>
    );
}

export default CenterLoading;