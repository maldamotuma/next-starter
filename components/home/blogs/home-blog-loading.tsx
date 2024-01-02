"use client"

import { Container, Grid, Skeleton } from "@mui/material";
import { FunctionComponent } from "react";

interface BlogListLoadingProps {

}

const BlogListLoading: FunctionComponent<BlogListLoadingProps> = () => {
    return (
        <Container maxWidth={"xl"}>
            <Grid container spacing={2}>
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
        </Container>
    );
}

export default BlogListLoading;