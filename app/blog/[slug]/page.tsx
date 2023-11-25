"use client";

import BlogRead from "@/components/blog/read";
import { Blog } from "@/components/blog/types";
import Wrapper from "@/components/wrapper";
import { useInitialCall } from "@/hooks/remote-call";
import { FunctionComponent } from "react";

interface BlgProps {
    params: {
        slug: string;
    }
}

const Blg: FunctionComponent<BlgProps> = ({ params: { slug } }) => {
    const { data: blog, status } = useInitialCall<Blog & {
        related_blogs: Blog[]
    } | null>(`/blog?b=${slug}`, null, {
        ky: "blog"
    });
    if (status === "pending") {
        return <>Loading</>
    } else if (!blog) {
        return <>URL Not Found</>
    }
    return (
        <Wrapper>
            <BlogRead
                blog={blog}
            />
        </Wrapper>
    );
}

export default Blg;