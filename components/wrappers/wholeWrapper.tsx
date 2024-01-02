"use client"

import { baseURL } from "@/config/axios";
import { useRemoteCall } from "@/hooks/remote-call";
import { setInitialPage } from "@/redux/page/page";
import { setInitialAuthUser } from "@/redux/slices/auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSession } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import { FunctionComponent, ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react";

interface WholeWrapperProps {
    children: ReactNode
}

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

const WholeWrapper: FunctionComponent<WholeWrapperProps> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const session = useSession<any>();
    const { axios } = useRemoteCall();
    const user = useAppSelector(state => state.auth.user);

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

    const initialCall = useCallback(
        async () => {
            await baseURL.get('/sanctum/csrf-cookie');
            const res = await axios.get("/auth-user", {
                ky: "user"
            });
            if (res) dispatch(setInitialAuthUser({ status: "idle", user: res }));
            else dispatch(setInitialAuthUser({ status: "idle", user: null }));
        },
        [], // eslint-disable-line react-hooks/exhaustive-deps
    )

    const appLogin = useCallback(
        async () => {
            await baseURL.get('/sanctum/csrf-cookie');
            const formdata = new FormData();
            formdata.append("name", session.data?.user?.name || "");
            formdata.append("email", session.data?.user?.email || "");
            const res = await axios.post("/app-login", {
                ky: "user",
                formdata
            })
            if (res) dispatch(setInitialAuthUser({ status: "idle", user: res }));
            else dispatch(setInitialAuthUser({ status: "idle", user: null }));
        },
        [session], // eslint-disable-line react-hooks/exhaustive-deps
    )



    useEffect(() => {

        if (localStorage.getItem("theme")) {
            setMode(localStorage.getItem("theme") === "light" ? "light" : "dark");
        }

        if (!user && session.status === "unauthenticated") {
            initialCall();
        } else if (session.status === "authenticated") {
            appLogin();
        }
        return () => {

        }
    }, [session.status]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        axios.get("/home", {
            ky: "blogs",
        }).then(blogs => {
            if (blogs) dispatch(setInitialPage({ status: "idle", home: {blogs: blogs} }));
        })

        return () => {

        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
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