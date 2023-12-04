import BlogList from "@/components/blog/list";
import { FunctionComponent } from "react";

interface BlogsProps {

}

const Blogs: FunctionComponent<BlogsProps> = () => {
    return (
        <>
            <BlogList />
        </>
    );
}

export default Blogs;