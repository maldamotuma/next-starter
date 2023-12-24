import { FunctionComponent } from "react";
import { Blog } from "./types";
import { Container, Grid } from "@mui/material";
import BlogCard from "./blog-card";

interface RelatedBlogsProps {
    blogs: Blog[]
}

const RelatedBlogs: FunctionComponent<RelatedBlogsProps> = ({ blogs }) => {
    return (
        <Container maxWidth={"xl"}>
            <Grid container spacing={3}>
                {
                    blogs.map(blog => (
                        <Grid
                            item
                            xl={3}
                            key={blog.title}
                        >
                            <BlogCard
                                blog={blog}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
}

export default RelatedBlogs;