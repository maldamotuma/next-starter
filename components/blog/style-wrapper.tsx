"use client"

import { Box, Chip } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import { Blog } from "./types";

interface BlogStyleWrapperProps {
    children: ReactNode
}

const BlogStyleWrapper: FunctionComponent<BlogStyleWrapperProps> = ({ children }) => {
    return (
        <Box>
            {
                children
            }
        </Box>
    );
}

export default BlogStyleWrapper;

export const ImageWrapper = ({ children }: BlogStyleWrapperProps) => {
    return (
        <Box
            sx={{
                mb: "-100px !important",
                display: "block",
                "& img": {
                    boxShadow: 10
                }
            }}
        >
            {
                children
            }
        </Box>
    )
}

export const HeaderChip = ({ blog }: { blog: Blog }) => {
    return (
        <Chip
            label={blog.cat.title}
            color={"primary"}
            size={"small"}
            sx={{
                position: {
                    xs: "relative",
                    lg: "none"
                },
                left: {
                    xs: "50%",
                    lg: "0"
                },
                transform: {
                    xs: "translateX(-50%)",
                    lg: "translateX(0)"
                }
            }}
        />
    )
}