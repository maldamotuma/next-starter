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
                    slides: { perView: 1.8, spacing: 5, origin: "center", },
                },
                "(min-width: 900px)": {
                    slides: { perView: 3.1, spacing: 10, origin: "center", },
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
        <Box
            sx={{
                display: {
                    lg: "none"
                }
            }}
        >
            <Title
                primary={"Related Blogs"}
            />
            <Box
                ref={sliderRef}
                className="keen-slider"
            >
                {
                    loaded ?
                        blogs.map(blog => (
                            <Box
                                key={`blg-itm-${blog.id}`}
                                className="keen-slider__slide"
                            >
                                <BlogCard
                                    blog={blog}
                                />
                            </Box>
                        ))
                        :
                        <Box>Loading...</Box>
                }

            </Box>
        </Box>
    );
}

export default RelatedBlogs;