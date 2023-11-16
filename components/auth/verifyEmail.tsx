import { useRemoteCall } from "@/hooks/remote-call";
import { Alert, AlertTitle, Button } from "@mui/material";
import { FunctionComponent } from "react";

interface VerifyEmailProps {

}

const VerifyEmail: FunctionComponent<VerifyEmailProps> = () => {
    const { axios, status } = useRemoteCall();

    const handleResend = async () => {
        await axios.post("/email/verification-notification", {
            successMessage: "We have sent you a verification Mail! Check your Email."
        });
    }

    return (
        <>
            <Alert severity="info" sx={{ mb: 2 }}>
                <AlertTitle>Verify Your Email Address Before Going On!</AlertTitle>
                We Have sent you an email containing verification link. Please verify your email.
            </Alert>
            <Button
                onClick={handleResend}
                disabled={status === "pending"}
            >
                {
                    status === "pending" ? "Resending..." : "Resend Verification Link"
                }
            </Button>
        </>
    );
}

export default VerifyEmail;