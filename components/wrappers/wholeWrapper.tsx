"use client"

import { store } from "@/redux/store";
import { SnackbarProvider } from "notistack";
import { FunctionComponent, ReactNode } from "react";
import { Provider } from "react-redux";

interface WholeWrapperProps {
    children: ReactNode
}
 
const WholeWrapper: FunctionComponent<WholeWrapperProps> = ({children}) => {
    return ( 
        <Provider store={store}>
            <SnackbarProvider>
            {
                children
            }
            </SnackbarProvider>
        </Provider>
    );
}
 
export default WholeWrapper;