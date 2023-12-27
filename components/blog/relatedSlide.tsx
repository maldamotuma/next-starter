"use client"

import { Box } from "@mui/material";
import { FunctionComponent, useState } from "react";
import Title from "../home/title";
import { useKeenSlider } from "keen-slider/react";
import { Blog } from "./types";
import BlogCard from "./blog-card";

interface RelatedBlogsProps {
    blogs: Blog[]
}

const RelatedBlogs: FunctionComponent<RelatedBlogsProps> = ({ blogs }) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            breakpoints: {
                "(min-width: 600px)": {
                    slides: { perView: 1.8, spacing: 5 },
                },
                "(min-width: 900px)": {
                    slides: { perView: 3.1, spacing: 10 },
                },
                "(min-width: 1200px)": {
                    slides: { perView: 3.8, spacing: 10 },
                }
            },
            slides: {
                perView: 1.3,
                spacing: 5,
            },
            created() {
                setLoaded(true);
            }
        },
        [
            // add plugins here
        ]
    )
    return (
        <Box>
            <Title
                primary={"Related Blogs"}
                secondary="Some Blogs from same Category"
            />
            <Box
                ref={sliderRef}
                className="keen-slider"
            >
                {
                    blogs.map(blog => (
                        <Box
                            key={`blg-itm-${blog.id}`}
                            className="keen-slider__slide"
                        >
                            {
                                loaded ?
                                    <BlogCard
                                        blog={blog}
                                    />
                                    :

                                    <Box
                                        className="keen-slider__slide"
                                    >Loading...</Box>
                            }
                        </Box>
                    ))
                }

            </Box>
        </Box>
    );
}

export default RelatedBlogs;