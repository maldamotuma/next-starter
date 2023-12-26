import { Dispatch, FunctionComponent, ReactNode, SetStateAction, useRef, useState } from "react";
import { Blog } from "./types";
import { Box, CardHeader, Avatar, Chip, ButtonProps, Dialog, IconButton, DialogContent, Button, Alert, ChipProps } from "@mui/material";
import { server_url } from "@/config/variables";
import PlaygroundApp from "@/malda_rte/rte/App";
import { AccessTime, Close, ReplyRounded } from "@mui/icons-material";
import moment from "moment";
import { bindDialog, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { useAppSelector } from "@/redux/store";
import { useRemoteCall } from "@/hooks/remote-call";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { EditorState, LexicalEditor } from "lexical";
import { useEditor } from "@/malda_rte/rte/Editor";
import { EditorStateRef } from "@/config/types";

interface CommentProps {
    comment: Blog["comments"][number]["replays"][number];
    setComments: Dispatch<SetStateAction<Blog["comments"]>>
}

const Comment: FunctionComponent<CommentProps> = ({ comment, setComments }) => {
    
    
    return (
        <Box>
            <CardHeader
                sx={{
                    pl: 0
                }}
                avatar={<Avatar src={`${server_url}/avatar/${comment.admin?.profile_picture || comment.user?.profile_picture}`} />}
                title={`${comment.admin?.first_name || comment.user?.first_name} ${comment.admin?.last_name || comment.user?.last_name}`}
            />

            <Box className="malda-react"
                sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 0,
                    bgcolor: "divider",
                    "& .editor div": {
                        p: 0,
                    },
                    "& .ContentEditable__root": {
                        minHeight: "unset"
                    }
                }}
            >
                <PlaygroundApp
                    notEditable
                    value={comment.comment}
                    settings={{
                        showTreeView: false,
                        isRichText: false
                    }}
                />
            </Box>
            <Box sx={{
                mt: .5,
                display: "flex",
                justifyContent: "flex-end",
                gap: 1
            }}>
                <WriteComment
                    comment={comment}
                    rndrTrigger={(btnprs) => (<Chip
                        {...btnprs}
                        label={"Replay"}
                        size={"small"}
                        color="primary"
                        icon={<ReplyRounded />}
                        clickable
                    />)}
                    setComments={setComments}
                />
                <Chip
                    icon={<AccessTime />}
                    label={moment(comment.created_at).fromNow()}
                    size={"small"}
                />
            </Box>
        </Box >
    );
}

export default Comment;

export const WriteComment = ({
    rndrTrigger,
    comment,
    setComments
}: {
    rndrTrigger(btnProps: ChipProps): ReactNode;
    comment: Blog["comments"][number]["replays"][number];
    setComments: Dispatch<SetStateAction<Blog["comments"]>>
}) => {
    const pps = usePopupState({ variant: "dialog" });
    const [editorState, setEditorState] = useState<string>("");
    const user = useAppSelector(state => state.auth.user);
    const { axios, status } = useRemoteCall();
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();
    const editorRef = useRef<{
        editor: LexicalEditor | null;
        editorState: EditorState | null;
    }>({
        editor: null,
        editorState: null
    });
    const { toHTML } = useEditor(editorRef.current);

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
        formdata.append("comment", toHTML());
        formdata.append("replay_id", `${comment.replay_id ?? comment.id}`);
        const res = await axios.post(`/write-comment/${comment.blog_id}`, {
            formdata,
            ky: "comment"
        })
        if (res) {
            setEditorState("");
            pps.close();
            setComments(prev => prev.map(cmnt => cmnt.id === (comment.replay_id ?? comment.id) ? { ...cmnt, replays: [{...res, user}, ...cmnt.replays] } : cmnt));
        }
    }

    const handleSetEditableRef = ({
        state,
        editor
    }: {
        state?: EditorStateRef['editorState'],
        editor?: EditorStateRef['editor']
    }) => {
        if (state) editorRef.current.editorState = state;
        if (editor) editorRef.current.editor = editor;
    }

    return (
        <>
            {
                rndrTrigger(bindTrigger(pps))
            }
            <Dialog
                {...bindDialog(pps)}
                onClose={() => { }}
                fullWidth
                maxWidth={"sm"}
            >
                <CardHeader
                    title={"Replay To Comment"}
                    action={<IconButton onClick={pps.close}><Close /></IconButton>}
                />
                <DialogContent>
                    <CardHeader
                        sx={{
                            pl: 0
                        }}
                        avatar={<Avatar src={`${server_url}/avatar/${comment.admin?.profile_picture || comment.user?.profile_picture}`} />}
                        title={`${comment.admin?.first_name || comment.user?.first_name} ${comment.admin?.last_name || comment.user?.last_name}`}
                    />
                    <Box className="malda-react"
                        sx={{
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 2,
                            p: 0,
                            bgcolor: "divider",
                            "& .editor div": {
                                p: 0,
                            }
                        }}
                    >
                        <PlaygroundApp
                            notEditable
                            value={comment.comment}
                            settings={{
                                showTreeView: false,
                                isRichText: false
                            }}
                        />
                    </Box>
                    {
                        user ?
                            <Box
                                sx={{
                                    pl: 5
                                }}
                            >
                                <CardHeader
                                    sx={{
                                        pl: 0
                                    }}
                                    avatar={<Avatar src={`${server_url}/avatar/${user?.profile_picture}`} />}
                                    title={`${user?.first_name} ${user?.last_name}`}
                                />
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
                                        onChange={nv => setEditorState(nv)}
                                        value={editorState}
                                        setEditorRef={handleSetEditableRef}
                                    />
                                </Box>
                                <LoadingButton
                                    loading={status === "pending"}
                                    startIcon={<ReplyRounded />}
                                    variant={"contained"}
                                    onClick={writeComment}
                                >
                                    Reply
                                </LoadingButton>
                            </Box>
                            :
                            <Alert sx={{ my: 1 }} severity={"info"}>You must Login to Reply</Alert>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}