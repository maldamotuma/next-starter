import SignUpForm from "@/components/auth/signup/form";
import { Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up for Tech-Scan Membership: Elevate Your Tech Journey Today",
    description: "Join Tech-Scan's vibrant community. Sign up for exclusive membership to access premium content on AI, full-stack development, React, Next.js, Laravel, Python, Machine Learning, and Deep Learning. Take your tech journey to new heights with us.",
    keywords: [
        "Tech-Scan",
        "Sign Up",
        "Membership",
        "AI",
        "Full-stack Development",
        "React",
        "Next.js",
        "Laravel",
        "Python",
        "Machine Learning",
        "Deep Learning",
        "Tech Community"
    ]
}

interface SignUpProps {

}

const SignUp: FunctionComponent<SignUpProps> = () => {
    return (
        <>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <SignUpForm />
        </>
    );
}

export default SignUp;