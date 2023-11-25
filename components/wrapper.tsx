import { FunctionComponent, ReactNode } from "react";
import Header from "./home/nav/header";
import Footers from "./footers";
import ResponsiveAppBar from "./home/nav/appbar";
import { Box } from "@mui/material";

interface WrapperProps {
    children: ReactNode | ReactNode;
}

const Wrapper: FunctionComponent<WrapperProps> = ({ children }) => {
    return (
        <>
            <Header />
            <ResponsiveAppBar />
            <Box sx={{pt: 1}}/>
            {
                children
            }
            <Footers />
        </>
    );
}

export default Wrapper;