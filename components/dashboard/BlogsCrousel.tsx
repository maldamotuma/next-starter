"use client"

import { Alert, Box, Container, Fab, Skeleton } from "@mui/material";
import { FunctionComponent, useCallback, useState } from "react";
import Title from "../home/title";
import { Blog } from "../blog/types";
import BlogCard from "../blog/blog-card";
import { useKeenSlider } from "keen-slider/react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import 'keen-slider/keen-slider.min.css'

interface BlogsCrouselProps {
    title: {
        primary: string;
        secondary: string;
    };
    blogs: Blog[]
}

const BlogsCrousel: FunctionComponent<BlogsCrouselProps> = ({
    title,
    blogs
}) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            breakpoints: {
                "(min-width: 600px)": {
                    slides: {
                        perView: 3, spacing: 5,
                        // origin: "center",
                    },
                },
                "(min-width: 900px)": {
                    slides: {
                        perView: 3.75, spacing: 10,
                        // origin: "center",
                    },
                },
                "(min-width: 1200px)": {
                    slides: {
                        perView: 4.2, spacing: 10,
                        // origin: "center",
                    },
                },
            },
            slides: {
                perView: 1.2,
                spacing: 5,
                // origin: "center",
            },
            created() {
                setLoaded(true);
            }
        },
        [
            // add plugins here
        ]
    )

    const scrollPrev = useCallback(
        () => instanceRef.current?.prev(),
        [instanceRef]
    )
    const scrollNext = useCallback(
        () => instanceRef.current?.next(),
        [instanceRef]
    )

    return (
        <Box sx={{
            // maxWidth: "calc(100vw - 20px) !important",
            width: "100%"
        }}>
            <Title
                {...title}
                primaryProps={{
                    align: "left"
                }}
                secondaryProps={{
                    align: "left"
                }}
            />
            {
                blogs.length === 0 ?
                    <Alert severity="info">No Bloggs Bookmarked</Alert>
                    :
                    <>
                        <Box
                            ref={sliderRef}
                            className="keen-slider"
                            sx={{
                                overflow: "hidden !important"
                            }}
                        >
                            {
                                blogs.map(blog => (
                                    <Box
                                        key={`testimony-blog-${blog.id}`}
                                        className="keen-slider__slide"
                                    >
                                        {
                                            loaded ?
                                                <BlogCard
                                                    blog={blog}
                                                />
                                                :
                                                <Skeleton
                                                    variant="rounded"
                                                    width={"100%"}
                                                    height={250}
                                                />
                                        }
                                    </Box>
                                ))
                            }
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "center",
                                gap: 2,
                                pt: 3
                            }}
                        >
                            <Fab
                                color="primary"
                                size="small"
                                sx={{
                                    zIndex: 1
                                }}
                                onClick={scrollPrev}
                            >
                                <ArrowBack />
                            </Fab>
                            <Fab
                                color="primary"
                                size="small"
                                sx={{
                                    zIndex: 1
                                }}
                                onClick={scrollNext}
                            >
                                <ArrowForward />
                            </Fab>
                        </Box>
                    </>
            }
        </Box>
    );
}

export default BlogsCrousel;