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
        }}>
            <KeyboardDoubleArrowDownOutlined sx={{
                width: 50,
                height: 50,
                color: "text.secondary",
                animation: 'arranim 2s infinite linear',
                '@keyframes arranim': {
                    '0%': {
                        transform: 'translateY(-50%)',
                        opacity: 0,
                    },
                    '50%': {
                        transform: 'translateY(0)',
                        opacity: .75,
                    },
                    '100%': {
                        transform: 'translateY(-50%)',
                        opacity: 0,
                    },
                },
            }} />
        </Box>
    );
}

export default ScrollPage;