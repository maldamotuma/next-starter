"use client";

import { useRemoteCall } from "@/hooks/remote-call";
import { setAuthUser } from "@/redux/slices/auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
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
        // eslint disable-nextline react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <Script id="verify-email-lnk" async src="https://www.googletagmanager.com/gtag/js?id=G-Q7PPML4EDC" />
      <Script id="verify-email">
        {
          `
          window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-Q7PPML4EDC');
        `
        }
      </Script>
            verifying your Email...
        </>
    );
}

export default VerifyEmail;