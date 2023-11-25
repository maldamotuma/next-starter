import BlogForm from "@/components/blog/form";
import { FunctionComponent } from "react";

interface CreateBlogProps {

}

const CreateBlog: FunctionComponent<CreateBlogProps> = () => {
    return (
        <>
            <BlogForm />
        </>
    );
}

export default CreateBlog;