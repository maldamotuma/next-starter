"use client"

import { Box, ThemeProvider, createTheme } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface ForceThemeProps {
    theme: "light" | "dark";
    children: ReactNode | ReactNode[]
}

const getTheme = (mode: "light" | "dark") => createTheme({
    palette: {
        mode
    }
});

const ForceTheme: FunctionComponent<ForceThemeProps> = ({
    theme,
    children
}) => {
    return (
        <ThemeProvider
            theme={getTheme(theme)}
        >
            {
                children
            }
        </ThemeProvider>
    );
}

export default ForceTheme;