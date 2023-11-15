"use client"

import axios, { baseURL } from "@/config/axios";
import { setAuthUser } from "@/redux/slices/auth";
import { store, useAppDispatch } from "@/redux/store";
import { SnackbarProvider } from "notistack";
import { FunctionComponent, ReactNode, useEffect } from "react";
import { Provider } from "react-redux";

interface WholeWrapperProps {
    children: ReactNode
}

const WholeWrapper: FunctionComponent<WholeWrapperProps> = ({ children }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const initialCall = async () => {
            await baseURL.get('/sanctum/csrf-cookie');
            const res = await axios.get("/auth-user");
            if (res.data.success === 1) dispatch(setAuthUser(res.data.user));
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