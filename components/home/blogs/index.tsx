"use client"

import { Container, Grid, Skeleton } from "@mui/material";
import { FunctionComponent } from "react";
import Title from "../title";
import { useAppSelector } from "@/redux/store";
import BlogCard from "@/components/blog/blog-card";

interface BlogsProps {

}

const Blogs: FunctionComponent<BlogsProps> = () => {
    const blogs = useAppSelector(state => state.page.home?.blogs);

    return (
        <Container maxWidth="xl">
            <Title
                primary={"Blogs"}
                secondary={"Some of our adventures"}
            />
            <Grid container spacing={3}>
                {
                    blogs ? blogs.map(blog => (
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
        </Container>
    );
}

export default Blogs;