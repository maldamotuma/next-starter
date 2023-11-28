"use client";

import BlogLoading from "@/components/blog/loading";
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

    return (
        <Wrapper>
            {
                status === "pending" ?
                    <BlogLoading />
                    :
                    !blog ?
                        <>URL Not Found</>
                        :
                        <BlogRead
                            blog={blog}
                        />
            }
        </Wrapper>
    );
}

export default Blg;