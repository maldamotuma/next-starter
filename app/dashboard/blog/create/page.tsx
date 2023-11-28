import BlogForm from "@/components/blog/form";
import Title from "@/components/home/title";
import { FunctionComponent } from "react";

interface CreateBlogProps {

}

const CreateBlog: FunctionComponent<CreateBlogProps> = () => {
    return (
        <>
            <Title
                primary={"Create Blog"}
                secondary={"Share Knowledge - Sharing is Caring"}
            />
            <BlogForm />
        </>
    );
}

export default CreateBlog;