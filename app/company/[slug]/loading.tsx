import BlogLoading from "@/components/blog/loading";
import Wrapper from "@/components/wrapper";
import { FunctionComponent } from "react";

interface LoadingProps {

}

const Loading: FunctionComponent<LoadingProps> = () => {
    return (<Wrapper>
        <BlogLoading />
    </Wrapper>);
}

export default Loading;