"use client";

import { useRemoteCall } from "@/hooks/remote-call";
import { setAuthUser } from "@/redux/slices/auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { FunctionComponent, useEffect } from "react";

interface VerifyEmailProps {

}

const VerifyEmail: FunctionComponent<VerifyEmailProps> = () => {
    const { axios } = useRemoteCall();
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);

    useEffect(() => {
        const id = searchParams.get("a");
        const hash = searchParams.get("b");
        const expires = searchParams.get("expires");
        const signature = searchParams.get("signature");
        axios.get(`email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`, {
            ky: "success",
            successMessage: "Successfully Verified",
            successCallBack() {
                dispatch(setAuthUser(user ? { ...user, email_verified_at: `${new Date()}` } : null));
            },
        }).finally(() => router.push("/"))
        return () => {

        }
    }, [])

    return (
        <>
            verifying your Email...
        </>
    );
}

export default VerifyEmail;