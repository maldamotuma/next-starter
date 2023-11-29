"use client"

import { KeyboardDoubleArrowDownOutlined, MouseTwoTone } from "@mui/icons-material";
import { Box, Typography, useScrollTrigger } from "@mui/material";
import { FunctionComponent } from "react";

interface ScrollPageProps {

}

const ScrollPage: FunctionComponent<ScrollPageProps> = () => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 10,
    });

    return (
        <Box sx={{
            position: "fixed",
            top: "calc(100% - 100px)",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: trigger? "none": "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: trigger ? 0 : 1,
            transition: ".2s opacity ease",
        }}>
            <KeyboardDoubleArrowDownOutlined sx={{
                width: 50,
                height: 50,
                color: "text.secondary",
                animation: 'arranim 1.2s infinite ease-in-out',
                '@keyframes arranim': {
                    '0%': {
                        transform: 'translateY(-50%)',
                        opacity: 1,
                    },
                    '100%': {
                        transform: 'translateY(50%)',
                        opacity: 0,
                    },
                },
            }} />
        </Box>
    );
}

export default ScrollPage;