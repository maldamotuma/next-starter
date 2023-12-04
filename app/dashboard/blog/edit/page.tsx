"use client"
import BlogForm from "@/components/blog/form";
import { Blog } from "@/components/blog/types";
import { useInitialCall } from "@/hooks/remote-call";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { FunctionComponent } from "react";

interface EditBlogProps {

}

const EditBlog: FunctionComponent<EditBlogProps> = () => {
    const searchParams = useSearchParams();
    const { data: blog, status } = useInitialCall<Blog | null>(`/blog?b=${searchParams.get("b")}`, null, {
        ky: "blog"
    });
    if (status === "pending") {
        return <>Loading</>
    } else if (!blog) {
        return <>URL Not Found</>
    }
    return (
        <>
        <Script id="edit-blog-lnk" async src="https://www.googletagmanager.com/gtag/js?id=G-Q7PPML4EDC" />
      <Script id="edit-blog">
        {
          `
          window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-Q7PPML4EDC');
        `
        }
      </Script>
            <BlogForm
                blog={blog}
            />
        </>
    );
}

export default EditBlog;