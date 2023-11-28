import { Container, Grid, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface BlogLoadingProps {

}

const BlogLoading: FunctionComponent<BlogLoadingProps> = () => {
    return (
        <Stack direction={"row"} sx={{
            px: {
                sm: 1,
                md: 2,
                lg: 3,
                xl: 4
            }
        }}>
            <Stack
                sx={{
                    flex: 1,
                    maxWidth: {
                        lg: 300,
                        xl: 450
                    },
                    display: {
                        xs: "none",
                        md: "flex"
                    }
                }}
            >
                <Grid container spacing={2}>
                    {
                        [1, 2, 3, 4, 5, 6].map(skltn => (
                            <Grid
                                item
                                xs={12}
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
                                        mb: 3,
                                        width: "50%"
                                    }}
                                    height={20}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </Stack>
            <Stack
                sx={{
                    flex: 1,
                }}
            >
                <Container maxWidth={"md"} sx={{maxWidth: "750px !important"}}>
                    <Skeleton
                        variant="rounded"
                        sx={{
                            mb: 1
                        }}
                        height={50}
                    />
                    <Skeleton
                        variant="rounded"
                        sx={{
                            mb: 3,
                            width: "50%"
                        }}
                        height={50}
                    />
                    <Skeleton
                        variant="rounded"
                        height={350}
                        sx={{
                            aspectRatio: "5/3",
                            mb: 2,
                            width: "100%",
                            display: "block"
                        }}
                    />
                    {
                        [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(skl => (
                            <Skeleton
                                variant="rounded"
                                sx={{
                                    my: 1
                                }}
                                height={20}
                                key={"blog-text-skel-" + skl}
                            />
                        ))
                    }
                </Container>
            </Stack>
            <Stack
                sx={{
                    pt: 10,
                    flex: 1,
                    maxWidth: {
                        lg: 300,
                        xl: 350
                    },
                    display: {
                        xs: "none",
                        md: "flex"
                    }
                }}
            >
                {
                    [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(skl => (
                        <Skeleton
                            variant="rounded"
                            sx={{
                                mb: 1
                            }}
                            height={20}
                            key={"blog-text-skel-" + skl}
                        />
                    ))
                }
            </Stack>
        </Stack>
    );
}

export default BlogLoading;