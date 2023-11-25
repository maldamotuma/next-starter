"use client";
import { useInitialList } from "@/hooks/remote-call";
import { FunctionComponent } from "react";
import { Blog } from "./types";
import { Grid } from "@mui/material";
import BlogCard from "./blog-card";

interface BlogListProps {

}

const BlogList: FunctionComponent<BlogListProps> = () => {
    const { data: blogs, renderList: renderBlogs } = useInitialList<Blog>("/blogs", {
        ky: "blogs"
    });
    return (
        <>
            {
                renderBlogs(<Grid container spacing={2} sx={{ boxSizing: "border-box" }}>
                    {
                        blogs.map(blog => (
                            <Grid
                                key={blog.title}
                                item
                                xs={12}
                                sm={6}
                                lg={4}
                                xl={3}
                            >
                                <BlogCard
                                    blog={blog}
                                    dash
                                />
                            </Grid>
                        ))
                    }
                </Grid>)
            }
        </>
    );
}

export default BlogList;