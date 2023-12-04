import Title from "@/components/home/title";
import Wrapper from "@/components/wrapper";
import { Container, Grid, Skeleton } from "@mui/material";
import { FunctionComponent } from "react";

interface LoadingProps {

}

const Loading: FunctionComponent<LoadingProps> = () => {
    return (
        <Wrapper>
            <Container maxWidth="xl">
                <Title
                    primary={"Blogs"}
                    secondary={"Bookmarked Blogs"}
                />
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
            </Container>
        </Wrapper>
    );
}

export default Loading;