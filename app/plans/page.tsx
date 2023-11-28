import Pricing from "@/components/home/priving";
import Wrapper from "@/components/wrapper";
import { FunctionComponent } from "react";

interface PlansProps {

}

const Plans: FunctionComponent<PlansProps> = () => {
    return (
        <Wrapper>
            <Pricing />
        </Wrapper>
    );
}

export default Plans;