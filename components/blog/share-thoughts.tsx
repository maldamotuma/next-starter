"use client"

import { useRemoteCall } from "@/hooks/remote-call";
import PlaygroundApp from "@/malda_rte/rte/App";
import { useAppSelector } from "@/redux/store";
import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Box, IconButton, InputLabel } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { Blog } from "./types";
import { useSnackbar } from "notistack";
import { Close } from "@mui/icons-material";
import Comment from "./comment";

interface ShareThoughtProps {
    blog: Blog;
}

const ShareThought: FunctionComponent<ShareThoughtProps> = ({ blog }) => {
    const user = useAppSelector(state => state.auth.user);
    const [editorState, seteditorState] = useState<string>("");
    const { axios, status } = useRemoteCall();
    const [comments, setComments] = useState<Blog['comments']>(blog['comments']);
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();

    const writeComment = async () => {
        if (!editorState) {
            enqueueSnackbar("Comment box must be a minimum of 25 chars.", {
                variant: "info",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center"
                },
                action: <IconButton onClick={() => closeSnackbar()}><Close /></IconButton>
            });
            return;
        }
        const formdata = new FormData();
        formdata.append("comment", editorState);
        const res = await axios.post(`/write-comment/${blog.id}`, {
            formdata,
            ky: "comment"
        })
        if (res) {
            seteditorState("");
            setComments(prev => ([{ ...res, user: user, replays: [] }, ...comments]));
        }
    }
    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <InputLabel sx={{ mb: 1 }}>Share Your Thought</InputLabel>
                {
                    user ?
                        <>
                            <Box className="malda-react" sx={{
                                border: 1,
                                borderColor: "divider",
                                borderRadius: 2,
                                mb: 1
                            }}>
                                <PlaygroundApp
                                    settings={{
                                        showTreeView: false,
                                        isRichText: false
                                    }}
                                    onChange={nv => seteditorState(nv)}
                                    value={editorState}
                                    minChars={25}
                                />
                            </Box>
                            <LoadingButton
                                onClick={writeComment}
                                loading={status === "pending"}
                            >Submit</LoadingButton>
                        </>
                        :
                        <Alert severity="info">
                            <AlertTitle>SignUp To Comment</AlertTitle>
                        </Alert>
                }
            </Box>
            {
                comments?.map(comment => (
                    <Box key={"comm+" + comment.id}>
                        <Comment
                            comment={comment}
                            setComments={setComments}
                        />
                        {
                            comment.replays?.map(rply => (
                                <Box
                                    key={"rply+" + rply.id}
                                    sx={{
                                        pl: 10
                                    }}
                                >
                                    <Comment
                                        comment={rply}
                                        setComments={setComments}
                                    />
                                </Box>
                            ))
                        }
                    </Box>
                ))
            }
        </Box>
    );
}

export default ShareThought;