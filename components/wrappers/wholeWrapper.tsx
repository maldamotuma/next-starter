"use client"

import axios, { baseURL } from "@/config/axios";
import { setInitialAuthUser } from "@/redux/slices/auth";
import { useAppDispatch } from "@/redux/store";
import { SnackbarProvider } from "notistack";
import { FunctionComponent, ReactNode, useEffect } from "react";

interface WholeWrapperProps {
    children: ReactNode
}

const WholeWrapper: FunctionComponent<WholeWrapperProps> = ({ children }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const initialCall = async () => {
            await baseURL.get('/sanctum/csrf-cookie');
            const res = await axios.get("/auth-user");
            if (res.data.success === 1) dispatch(setInitialAuthUser({status: "idle", user: res.data.user}));
            else dispatch(setInitialAuthUser({status: "idle", user: null}));
        }
        initialCall();
        return () => {

        }
    }, [])

    return (
        <SnackbarProvider>
            {
                children
            }
        </SnackbarProvider>
    );
}

export default WholeWrapper;