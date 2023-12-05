"use client"

import { FunctionComponent } from "react";
import SigninForm from "./signin/form";
import { Box } from "@mui/material";

interface TabformProps {
    noRedirect?: boolean;
}

const Tabform: FunctionComponent<TabformProps> = ({ noRedirect }) => {

    return (
        <Box>
            <SigninForm modal noRedirect={noRedirect} />
        </Box>
    );
}

export default Tabform;