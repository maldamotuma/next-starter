"use client"

import { Alert, Grid, Skeleton } from "@mui/material";
import { FunctionComponent } from "react";
import BlogCard from "./blog-card";
import { Blog } from "./types";
import { statusTypes } from "@/config/types";
import { useInitialCall } from "@/hooks/remote-call";
import { useAppSelector } from "@/redux/store";

interface BlogBookmarksProps {

}

const BlogBookmarks: FunctionComponent<BlogBookmarksProps> = () => {
    const { data: blogs, status } = useInitialCall<Blog[]>("/blogs?favorites=true", [], {
        ky: "blogs"
    });
    const auth = useAppSelector(state => state.auth);

    return (
        <>
            <Grid container spacing={3}>
                {
                    status !== "pending" ? blogs?.map(blog => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={"blog-" + blog.id}
                        >
                            <BlogCard
                                blog={blog}
                            />
                        </Grid>
                    ))
                        :
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
            {
                status !== "pending" && blogs?.length === 0 &&
                <Alert severity={"info"}>No Blog Bookmarked</Alert>
            }
            {
                auth.status === "idle" && !auth.user &&
                <Alert severity={"info"}>Login to Bookmark Blogs</Alert>
            }
        </>
    );
}

export default BlogBookmarks;