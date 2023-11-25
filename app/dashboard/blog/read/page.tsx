"use client"

import BlogRead from "@/components/blog/read";
import { Blog } from "@/components/blog/types";
import { useInitialCall } from "@/hooks/remote-call";
import { useSearchParams } from "next/navigation";
import { FunctionComponent } from "react";

interface ReadBlogProps {

}

const ReadBlog: FunctionComponent<ReadBlogProps> = () => {
    const searchParams = useSearchParams();
    const { data: blog, status } = useInitialCall<Blog & {
        related_blogs: Blog[]
    } | null>(`/blog?b=${searchParams.get("b")}`, null, {
        ky: "blog"
    });
    if (status === "pending") {
        return <>Loading</>
    } else if (!blog) {
        return <>URL Not Found</>
    }
    return (
        <>
            <BlogRead
                blog={blog}
            />
        </>
    );
}

export default ReadBlog;