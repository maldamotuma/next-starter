"use client"
import BlogForm from "@/components/blog/form";
import { Blog } from "@/components/blog/types";
import { useInitialCall } from "@/hooks/remote-call";
import { useSearchParams } from "next/navigation";
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
            <BlogForm
                blog={blog}
            />
        </>
    );
}

export default EditBlog;