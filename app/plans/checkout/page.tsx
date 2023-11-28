import Title from "@/components/home/title";
import PaymetProcess from "@/components/plans/payment";
import Wrapper from "@/components/wrapper";
import { Container } from "@mui/material";
import { FunctionComponent } from "react";

interface PaymentsCheckoutProps {

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