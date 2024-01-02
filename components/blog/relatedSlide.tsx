"use client"

import { Box, Fab } from "@mui/material";
import { FunctionComponent, MouseEvent, useEffect, useRef, useState } from "react";
import Title from "../home/title";
import { useKeenSlider } from "keen-slider/react";
import { Blog } from "./types";
import BlogCard from "./blog-card";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";

interface RelatedBlogsProps {
    blogs: Blog[]
}

const RelatedBlogs: FunctionComponent<RelatedBlogsProps> = ({ blogs }) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const conRef = useRef<HTMLDivElement>();
    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            breakpoints: {
                "(min-width: 600px)": {
                    slides: { perView: 2 }
                },
                "(min-width: 900px)": {
                    slides: { perView: 3 }
                },
                "(min-width: 1200px)": {
                    slides: { perView: 4 }
                }
            },
            slides: {
                perView: 1
            },
            initial: 0,
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
            mode: "snap",
            created() {
                setLoaded(true);
            }
        },
        [
            // add plugins here
        ]
    )


    const handlePrev = () => {
        instanceRef.current?.prev();
    }

    const handleNext = () => {
        instanceRef.current?.next();
    }

    return (
        <Box>
            <Title
                primary={"Related Blogs"}
                secondary="Some Blogs from same Category"
            />
            <Box
                sx={{
                    position: "relative"
                }}
                ref={conRef}
            >
                <Box
                    ref={sliderRef}
                    className="keen-slider"
                >
                    {
                        blogs.map(blog => (
                            <Box
                                key={`blg-itm-${blog.id}`}
                                className="keen-slider__slide"
                                sx={{
                                    "&:hover": {
                                        zIndex: 2
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        px: 0.5
                                    }}
                                >
                                    <BlogCard
                                        blog={blog}
                                    />
                                </Box>
                            </Box>
                        ))
                    }

                </Box>
                {
                    currentSlide !== 0 ?
                        <Fab
                            onClick={handlePrev}
                            color="secondary"
                            size={"small"}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                zIndex: 1,
                                transition: ".2s z-index linear",
                                left: 0,
                                transform: {
                                    sm: "translate(-50%, -50%)"
                                }
                            }}
                        >
                            <ArrowBackIosNewOutlined />
                        </Fab>
                        :
                        null
                }
                {
                    instanceRef.current?.track?.details.maxIdx !== currentSlide ?
                        <Fab
                            color="secondary"
                            size={"small"}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                zIndex: 1,
                                transition: ".2s z-index linear",
                                right: 0,
                                transform: {
                                    sm: "translate(30%, -50%)"
                                }
                            }}
                            onClick={handleNext}
                        >
                            <ArrowForwardIosOutlined />
                        </Fab>
                        :
                        null
                }
            </Box>
        </Box>
    );
}

export default RelatedBlogs;