"use client"

import BlogLoading from "@/components/blog/loading";
import BlogRead from "@/components/blog/read";
import { Blog } from "@/components/blog/types";
import { useInitialCall } from "@/hooks/remote-call";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
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
        return <BlogLoading />
    } else if (!blog) {
        return <>URL Not Found</>
    }
    return (
        <>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YRJ9KDZNZ0" />
            <Script id={"google-analytics"}>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-YRJ9KDZNZ0');
                `}
            </Script>
            <BlogRead
                blog={blog}
            />
        </>
    );
}

export default ReadBlog;