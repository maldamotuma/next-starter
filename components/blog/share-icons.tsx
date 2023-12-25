import { CopyAllOutlined, LinkedIn, Twitter } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { FunctionComponent } from "react";
import { Blog } from "./types";
import Favorite from "./fovorite";
import EditBlogButton from "./edit-blog-button";

interface ShareButtonsProps {
    blog: Blog;
}

const ShareButtons: FunctionComponent<ShareButtonsProps> = ({ blog }) => {
    return (
        <Stack
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Favorite blog={blog} />
            <IconButton>
                <CopyAllOutlined />
            </IconButton>
            <IconButton>
                <LinkedIn />
            </IconButton>
            <IconButton>
                <Twitter />
            </IconButton>
            <EditBlogButton slug={blog.slug} author_id={blog.user_id} />
        </Stack>
    );
}

export default ShareButtons;