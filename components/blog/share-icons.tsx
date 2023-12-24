import { CopyAllOutlined, LinkedIn, Twitter } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { FunctionComponent } from "react";
import { Blog } from "./types";
import Favorite from "./fovorite";

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
        </Stack>
    );
}

export default ShareButtons;