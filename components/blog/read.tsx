"use client"

import { Alert, AlertTitle, Avatar, Box, Button, CardHeader, CardMedia, Chip, Container, Divider, IconButton, InputLabel, Stack } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { Blog } from "./types";
import { server_url } from "@/config/variables";
import Title from "../home/title";
import PlaygroundApp from "@/malda_rte/rte/App";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useRemoteCall } from "@/hooks/remote-call";
import { LoadingButton } from "@mui/lab";
import Comment from "./comment";
import BlogCard from "./blog-card";
import RelatedBlogs from "./relatedSlide";
import SimpleBar from 'simplebar-react';
import Favorite from "./fovorite";
import SubscribeCta from "../home/call-to-actions/SubscribeCard";
import { useSnackbar } from "notistack";
import { Close } from "@mui/icons-material";
import { motion, useScroll } from "framer-motion";
import { blue } from "@mui/material/colors";


interface BlogReadProps {
    blog: Blog & {
        related_blogs: Blog[]
    }
}

const BlogRead: FunctionComponent<BlogReadProps> = ({ blog }) => {
    const user = useAppSelector(state => state.auth.user);
    const [editorState, seteditorState] = useState<string>("");
    const { axios, status } = useRemoteCall();
    const [comments, setComments] = useState<Blog['comments']>(blog.comments);
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();
    const { scrollYProgress } = useScroll();

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
        <>
            <Box
                sx={{
                    "& .progress-bar": {
                        position: "fixed",
                        top: 68,
                        left: 0,
                        right: 0,
                        height: "6px",
                        background: theme => blue[theme.palette.mode === "light" ? 900 : 100],
                        transformOrigin: "0%",
                        zIndex: theme => theme.zIndex.appBar + 1
                    }
                }}
            >
                <motion.div
                    className="progress-bar"
                    style={{ scaleX: scrollYProgress }}
                />
            </Box >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "flex-start",
                    width: {
                        md: "calc(80% - 20px)"
                    },
                    px: {
                        md: 5
                    }
                }}
            >
                <Box
                    sx={{
                        display: {
                            xs: "none",
                            lg: "inline-block"
                        },
                        width: "100%",
                        maxWidth: {
                            lg: "315px !important",
                            xl: "365px !important"
                        },
                        "& #related-scroll": {
                            maxWidth: {
                                lg: "315px !important",
                                xl: "365px !important"
                            },
                            height: "calc(100vh - 110px)",
                            pr: "15px"
                        },
                        overflow: "auto",
                        pr: 1,
                        position: "sticky",
                        top: 80,
                        p: 0,
                        m: 0,
                        borderRadius: "10px",
                        overflowX: "hidden"
                    }}
                >
                    <SimpleBar
                        id="related-scroll"
                    >

                        <div>
                            {
                                blog.related_blogs.map(blg => (
                                    <Box
                                        key={"related-" + blg.id}
                                        sx={{
                                            mb: 1
                                        }}
                                    >
                                        <BlogCard
                                            blog={blg}
                                        />
                                    </Box>
                                ))
                            }
                        </div>
                    </SimpleBar>
                </Box>
                <Container sx={{ maxWidth: "750px !important" }}>
                    <Box>
                        <Title
                            primary={blog.title}
                            primaryProps={{
                                align: "left"
                            }}
                            secondaryProps={{
                                sx: {
                                    mb: 0,
                                    pb: 0
                                }
                            }}
                        />
                        <Chip
                            label={blog.cat?.title}
                            color="info"
                            size="small"
                            sx={{
                                mt: 1
                            }}
                            variant={"outlined"}
                        /><br />
                        <Favorite blog={blog} />
                        {
                            blog.user ?
                                <CardHeader
                                    sx={{
                                        pl: 0
                                    }}
                                    avatar={<Avatar src={`${server_url}/avatar/${blog.user.profile_picture}`} />}
                                    title={`${blog.user.first_name} ${blog.user.last_name}`}
                                />
                                :
                                <CardHeader
                                    sx={{
                                        pl: 0
                                    }}
                                    avatar={<Avatar src={`${server_url}/avatar/${blog.admin?.profile_picture}`} />}
                                    title={`${blog.admin?.first_name} ${blog.admin?.last_name}`}
                                />
                        }
                        {
                            user && (user.id === blog.user_id) &&
                            <Box sx={{ py: 1 }}>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    component={Link}
                                    href={`/dashboard/blog/edit?b=${blog.slug}`}
                                >Edit</Button>
                            </Box>
                        }
                        <CardMedia
                            component={"img"}
                            src={`${server_url}/blog/${blog.image}?width=750`}
                            alt={blog.title}
                            sx={{
                                display: "block",
                                aspectRatio: "5/3",
                                backgroundSize: "cover",
                                borderRadius: 4,
                                mt: 2,
                                bgcolor: "divider"
                            }}
                        />
                        <Box
                            className="malda-rte"
                            sx={{
                                "& .editor div": {
                                    p: 0
                                },
                                "& .table-of-contents": {
                                    width: "calc(20% + 10px)",
                                    height: "60vh",
                                    top: 150,
                                    right: 0,
                                    p: 0,
                                    bgcolor: "background.paper",
                                    display: {
                                        xs: 'none',
                                        md: "block"
                                    }
                                },
                                "& .table-of-contents .headings": {
                                    width: "clac(100%)",
                                    height: "100%",
                                    right: "100%"
                                },
                                "& .table-of-contents .headings::before": {
                                    // width: "100%",
                                    height: "100%",
                                    right: "100%"
                                },
                                "& img": {
                                    maxWidth: "100%"
                                }
                            }}
                        >
                            <PlaygroundApp
                                value={blog.body}
                                notEditable
                                settings={{
                                    showTreeView: false,
                                    showTableOfContents: true
                                }}
                            />
                        </Box>
                        <Divider sx={{ mt: 3, mb: 5 }} />
                        <Box sx={{ mb: { xs: 2, md: 10 } }}>
                            <SubscribeCta />
                        </Box>
                        <RelatedBlogs
                            blogs={blog.related_blogs || []}
                        />
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
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default BlogRead;