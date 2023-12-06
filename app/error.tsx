"use client"

import ErrorReportForm from "@/components/error/report";
import Wrapper from "@/components/wrapper";
import { FunctionComponent } from "react";

interface ErrorPageProps {
    error: Error & {digest: string};
    reset(): void;
}

const ErrorPage: FunctionComponent<ErrorPageProps> = ({ error, reset }) => {
    return (
        <Wrapper>
            <ErrorReportForm {...({ error, reset })} />
        </Wrapper>
    );
}

export default ErrorPage;