import BlogList from "@/components/blog/list";
import { Article } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
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