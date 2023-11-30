"use client";
import { useInitialList } from "@/hooks/remote-call";
import { FunctionComponent } from "react";
import { Blog } from "./types";
import { Grid, Skeleton } from "@mui/material";
import BlogCard from "./blog-card";

interface BlogListProps {

}

const BlogList: FunctionComponent<BlogListProps> = () => {
    const { data: blogs, renderList: renderBlogs } = useInitialList<Blog>("/blogs?mine=yess", {
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
                                />
                            </Grid>
                        ))
                    }
                </Grid>,
                    <Grid container spacing={3}>
                        {
                            [1, 2, 3, 4, 5, 6].map(skltn => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={"skeleton-" + skltn}
                                >
                                    <Skeleton
                                        variant="rounded"
                                        height={250}
                                        sx={{
                                            aspectRatio: "5/3",
                                            mb: 2,
                                            width: "100%",
                                            display: "block"
                                        }}
                                    />

                                    <Skeleton
                                        variant="rounded"
                                        sx={{
                                            mb: 2
                                        }}
                                        height={50}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        sx={{
                                            mb: 1
                                        }}
                                        height={20}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        sx={{
                                            mb: 1
                                        }}
                                        height={20}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                )
            }
        </>
    );
}

export default BlogList;