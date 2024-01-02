import { FunctionComponent } from "react";
import { Blog } from "./types";
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { server_url } from "@/config/variables";
import { maxLine } from "../utils/helpers";
import Link from "next/link";

interface BlogCardProps {
    blog: Blog;
    dash?: boolean;
}

const BlogCard: FunctionComponent<BlogCardProps> = ({
    blog,
    dash
}) => {
    return (
        <Card
            elevation={0}
            className={"blog-item"}
        >
            <CardMedia
                component={"img"}
                src={`${server_url}/blog/${blog.image}`}
                alt={blog.title}
                sx={{
                    display: "block",
                    aspectRatio: "5/3",
                    borderRadius: 4,
                    bgcolor: "divider"
                }}
            />
            <CardContent sx={{ pb: 0 }}>
                <Chip
                    label={blog.cat?.title}
                    color="info"
                    size="small"
                    variant={"outlined"}
                />
                <Typography fontSize={"1.2em"} fontWeight={500}
                    sx={maxLine(2)}
                >
                    {
                        blog.title
                    }
                </Typography>
                <Typography
                    sx={{
                        ...maxLine(2)
                    }}
                    color="text.secondary">
                    {
                        blog.article
                    }
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={Link}
                    href={dash ? `/dashboard/blog/read?b=${blog.slug}` : `/blog/${blog.slug}`}
                >Read More</Button>
            </CardActions>
        </Card>
    );
}

export default BlogCard;