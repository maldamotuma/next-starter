"use client"

import { Box, Chip, alpha } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import { Blog } from "./types";
import { blue } from "@mui/material/colors";

interface BlogStyleWrapperProps {
    children: ReactNode
}


const BlogStyleWrapper: FunctionComponent<BlogStyleWrapperProps> = ({ children }) => {
    return (
        <Box
            sx={{
                "& .editor div": {
                    p: 0
                },
                "& img": {
                    maxWidth: "100%"
                },
                "& .editor-scroller": {
                    overflowY: "clip"
                },
                "& pre": {
                    bgcolor: theme => alpha(theme.palette.primary.dark, .075),
                    borderRadius: 3,
                    p: "20px"
                },
                "& pre::before": {
                    bgcolor: "divider",
                    display: "none"
                },
                "& .PlaygroundEditorTheme__textCode": {
                    bgcolor: "divider"
                },
                "& .PlaygroundEditorTheme__quote": {
                    color: "text.secondary",
                    borderLeftColor: "divider"
                },
                "& .Collapsible__container": {
                    bgcolor: theme => alpha(theme.palette.primary.dark, .075),
                    borderColor: "divider"
                },
                "& .Collapsible__title::before": {
                    borderLeftColor: "primary.dark"
                },
                "& .Collapsible__container[open] .Collapsible__title:before": {
                    borderTopColor: "primary.dark"
                },
                "& .PlaygroundEditorTheme__tableCellHeader": {
                    bgcolor: "divider"
                },
                "& button": {
                    color: `${blue[900]} !important`,
                    fontWeight: 700
                }
            }}
        >
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