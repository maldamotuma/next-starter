"use client"

import { FunctionComponent, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { SessionProvider } from "next-auth/react";

interface ReduxWrapperProps {
    children: ReactNode | ReactNode[]
}

const ReduxWrapper: FunctionComponent<ReduxWrapperProps> = ({ children }) => {
    return (
        <SessionProvider>
            <Provider store={store}>
                {
                    children
                }
            </Provider>
        </SessionProvider>
    );
}

export default ReduxWrapper;