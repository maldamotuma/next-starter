import Title from "@/components/home/title";
import PaymetProcess from "@/components/plans/payment";
import Wrapper from "@/components/wrapper";
import { Container } from "@mui/material";
import { Metadata } from "next";
import { FunctionComponent } from "react";

interface PaymentsCheckoutProps {

}
export const metadata: Metadata = {
    title: "Secure Checkout at Tech-Scan: Complete Your Membership Purchase with Confidence",
    description: "Experience a seamless and secure checkout process at Tech-Scan. Finalize your membership purchase with confidence, unlocking premium content on AI, full-stack development, React, Next.js, Laravel, Python, Machine Learning, and Deep Learning. Start your enhanced tech journey today.",
    keywords: [
        "Tech-Scan",
        "Secure Checkout",
        "Membership Purchase",
        "Tech Journey",
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
const PaymentsCheckout: FunctionComponent<PaymentsCheckoutProps> = () => {
    return (
        <Wrapper>
            <Container maxWidth="sm">
                <Title
                    primary={"Payment"}
                />
                <PaymetProcess />
            </Container>
        </Wrapper>
    );
}

export default PaymentsCheckout;