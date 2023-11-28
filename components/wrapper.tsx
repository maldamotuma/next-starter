import { FunctionComponent, ReactNode } from "react";
import Header from "./home/nav/header";
import Footers from "./footers";
import ResponsiveAppBar from "./home/nav/appbar";
import { Box, Stack } from "@mui/material";

interface WrapperProps {
    children: ReactNode | ReactNode;
}

const Wrapper: FunctionComponent<WrapperProps> = ({ children }) => {
    return (
        <Stack sx={{ minHeight: "100vh", boxSizing: "border-box" }}>
            <Header />
            <ResponsiveAppBar />
            <Box sx={{ pt: 1 }} />
            {
                children
            }
            <Box sx={{ flexGrow: 1 }} />
            <Footers />
        </Stack>
    );
}

export default Wrapper;