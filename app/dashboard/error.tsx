"use client"

import ErrorReportForm from "@/components/error/report";
import { FunctionComponent } from "react";

interface ErrorPageProps {
    error: Error & {digest: string};
    reset(): void;
}

const ErrorPage: FunctionComponent<ErrorPageProps> = ({ error, reset }) => {
    return (
        <>
            <ErrorReportForm {...({ error, reset })} />
        </>
    );
}

export default ErrorPage;