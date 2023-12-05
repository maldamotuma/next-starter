"use client"

import BlogCard from "@/components/blog/blog-card";
import { Blog } from "@/components/blog/types";
import Title from "@/components/home/title";
import { useInitialCall } from "@/hooks/remote-call";
import { Container, Grid, Skeleton } from "@mui/material";
import Script from "next/script";
import { FunctionComponent } from "react";

interface BookmarksProps {

}

const Bookmarks: FunctionComponent<BookmarksProps> = () => {
    const { data: blogs, status } = useInitialCall<Blog[]>("/blogs?favorites=true", [], {
        ky: "blogs"
    });

    return (
        <Container maxWidth="xl">
            <Script id={"ggl-lnk"} async src="https://www.googletagmanager.com/gtag/js?id=G-YRJ9KDZNZ0" />
            <Script id={"google-analytics"}>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-YRJ9KDZNZ0');
                `}
            </Script>
            <Title
                primary={"Blogs"}
                secondary={"Bookmarked Blogs"}
            />
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
        </Container>
    );
}

export default Bookmarks;