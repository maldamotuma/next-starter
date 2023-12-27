"use client"
import { CopyAllOutlined, LinkedIn, Twitter, Close, Reddit, WhatsApp } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { FunctionComponent } from "react";
import { Blog } from "./types";
import Favorite from "./fovorite";
import EditBlogButton from "./edit-blog-button";
import { useSnackbar } from "notistack";
import { usePathname } from "next/navigation";
import { app_url, server_url } from "@/config/variables";
import copy from 'copy-to-clipboard';
import {
    LinkedinShareButton, RedditShareButton, TwitterShareButton, WhatsappShareButton
} from "react-share";

interface ShareButtonsProps {
    blog: Blog;
}

const ShareButtons: FunctionComponent<ShareButtonsProps> = ({ blog }) => {
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();
    const pathString = usePathname();
    const fullPath = `${app_url}${pathString}`;

    const handleCopyLink = () => {
        copy(fullPath)
        enqueueSnackbar("Coped to clipboard", {
            variant: "success",
            action: <IconButton onClick={() => closeSnackbar()}><Close /></IconButton>
        })
    }

    return (
        <Stack
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Favorite blog={blog} />
            <Tooltip title="copy URL to clipboard" disableInteractive>
                <IconButton
                    onClick={handleCopyLink}
                >
                    <CopyAllOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip title="Share on LinkedIn" disableInteractive>
                <LinkedinShareButton url={fullPath}>
                    <IconButton>
                        <LinkedIn />
                    </IconButton>
                </LinkedinShareButton>
            </Tooltip>
            <Tooltip title="Share on X 😜/ twitter" disableInteractive>
                <TwitterShareButton url={fullPath}>
                    <IconButton>
                        <Twitter />
                    </IconButton>
                </TwitterShareButton>
            </Tooltip>
            <Tooltip title="Share on Reddit" disableInteractive>
                <RedditShareButton url={fullPath}>
                    <IconButton>
                        <Reddit />
                    </IconButton>
                </RedditShareButton>
            </Tooltip>
            <Tooltip title="Share on Whatsapp" disableInteractive>
                <WhatsappShareButton url={fullPath}>
                    <IconButton>
                        <WhatsApp />
                    </IconButton>
                </WhatsappShareButton>
            </Tooltip>
            <Tooltip title="Edit Blog" disableInteractive>
                <EditBlogButton slug={blog.slug} author_id={blog.user_id} />
            </Tooltip>
        </Stack>
    );
}

export default ShareButtons;