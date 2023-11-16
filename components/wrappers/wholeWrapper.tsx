"use client"

import axios, { baseURL } from "@/config/axios";
import { setInitialAuthUser } from "@/redux/slices/auth";
import { useAppDispatch } from "@/redux/store";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { FunctionComponent, ReactNode, createContext, useEffect, useMemo, useState } from "react";

interface WholeWrapperProps {
    children: ReactNode
}

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

const WholeWrapper: FunctionComponent<WholeWrapperProps> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const thmmd = prevMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem("theme", thmmd);
                    return thmmd;
                });
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem("theme")) {
            setMode(localStorage.getItem("theme") === "light" ? "light" : "dark");
        }
        const initialCall = async () => {
            await baseURL.get('/sanctum/csrf-cookie');
            const res = await axios.get("/auth-user");
            if (res.data.success === 1) dispatch(setInitialAuthUser({ status: "idle", user: res.data.user }));
            else dispatch(setInitialAuthUser({ status: "idle", user: null }));
        }
        initialCall();
        return () => {

        }
    }, [])

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme/>
                <SnackbarProvider>
                    {
                        children
                    }
                </SnackbarProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default WholeWrapper;