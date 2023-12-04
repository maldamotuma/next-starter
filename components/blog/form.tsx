"use client";

import { useInitialCall, useRemoteCall } from "@/hooks/remote-call";
import PlaygroundApp from "@/malda_rte/rte/App";
import { Image as ImageIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, FormControl, InputLabel, ListSubheader, MenuItem, Select, Stack, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, FunctionComponent, ReactNode, useState } from "react";
import { Section } from "../sections/types";
import { rulesAndMessagedType, useValidator } from "@malda/react-validator";
import { Blog } from "./types";
import { useRouter } from "next/navigation";
import { server_url } from "@/config/variables";
import Confirm from "../confirmation";


interface BlogFormProps {
    blog?: Blog
}

const BlogForm: FunctionComponent<BlogFormProps> = ({
    blog
}) => {
    const rules: rulesAndMessagedType = {
        rules: {
            title: ['required'],
            article: ['required'],
            meta_keywords: ['required']
        },
        files: {
            rules: {
                image: {
                    required: blog ? false : true,
                    maxSize: 300
                }
            }
        }
    }
    const { validate } = useValidator("blog-form", rules);
    const { axios, status } = useRemoteCall();
    const [blg, setBlg] = useState<{
        image: File | null,
        body: string | null,
    }>({
        image: null,
        body: null,
    });
    const { data: sections, status: sec_status } = useInitialCall<Section[]>("/sections?form=yes", [], {
        ky: "sections"
    });
    const router = useRouter();


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // @ts-ignore
            setBlg(prev => ({ ...prev, image: e.target.files[0] }));
        }
    }

    const handleBodyChange = (bdy: string) => {
        setBlg(prev => ({ ...prev, body: bdy }));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate(async () => {
            const formdata = new FormData(e.currentTarget);
            formdata.append("body", blg.body || "");
            const res = await axios.post(blog ? `/update-blog/${blog.id}` : "/create-blog", {
                formdata,
                ky: "slug"
            })
            if (res) router.push(`/dashboard/blog/read?b=${res}`)
        });
    }

    const parseSection = () => {
        let sctn: ReactNode[] = [];
        sections.forEach(stn => {
            sctn.push(<ListSubheader>{stn.title}</ListSubheader>)
            stn.categories.map(cat => {
                sctn.push(<MenuItem value={cat.id} key={`cat-${cat.id}`} component="option">{cat.title}</MenuItem>)
            })
        });

        return sctn;
    }

    const handleDelete = async () => {
        await axios.post(`/delete-blog/${blog?.id}`, {
            successCallBack() {
                router.push("/dashboard/blog/list")
            },
        })
    }


    return (
        <Container maxWidth={"lg"} sx={{
            maxWidth: "1100px !important",
            p: "0 !important"
        }}>
            <Stack gap={2}
                component={"form"}
                onSubmit={handleSubmit}
                id={"blog-form"}
            >
                <div id="input-category_id">
                    <FormControl
                        fullWidth
                    >
                        <InputLabel>Category</InputLabel>
                        <Select
                            label={"Category"}
                            name="category_id"
                            defaultValue={blog?.category_id}
                        >
                            <MenuItem value=""></MenuItem>
                            {
                                parseSection()
                            }
                        </Select>
                    </FormControl>
                </div>
                <div id="input-title">
                    <TextField
                        label={"Title"}
                        fullWidth
                        placeholder="Headline for your blog"
                        name="title"
                        defaultValue={blog?.title}
                    />
                </div>
                <div id="input-article">
                    <TextField
                        label={"Arrticle"}
                        fullWidth
                        placeholder="Very short hook for your blog"
                        name="article"
                        multiline
                        rows={3}
                        defaultValue={blog?.article}
                    />
                </div>
                <Box id="input-body" sx={{
                    border: 1,
                    borderColor: "divider",
                    p: 2,
                    borderRadius: 2
                }}>
                    <InputLabel sx={{ mb: 0, pb: 0 }}>Body / Blog Detail</InputLabel>
                    <Box className="malda-rte" sx={{
                        width: "100%",
                        "& .editor-shell": {
                            m: 0,
                            mt: 1
                        }
                    }}>
                        <PlaygroundApp
                            settings={{
                                isRichText: true,
                                showTreeView: false
                            }}
                            onChange={handleBodyChange}
                            {
                            ...(blog && {
                                value: blog.body
                            })
                            }
                        />
                    </Box>
                </Box>
                <div id="input-image" style={{ paddingTop: "10px" }}>
                    {
                        blg.image ? <Box
                            component={"img"}
                            alt={""}
                            width="100%"
                            src={URL.createObjectURL(blg.image)}
                            style={{
                                borderRadius: "10px"
                            }}
                        />
                            :
                            blog?.image ?
                                <Box
                                    component={"img"}
                                    alt={""}
                                    width="100%"
                                    src={`${server_url}/blog/${blog.image}`}
                                    style={{
                                        borderRadius: "10px"
                                    }}
                                />
                                :
                                <></>
                    }
                    <Button
                        variant={"outlined"}
                        // fullWidth
                        component={"label"}
                        startIcon={<ImageIcon />}
                    >
                        <input
                            name="image"
                            type="file"
                            style={{
                                display: "none"
                            }}
                            onChange={handleImageChange}
                        />
                        Choose Cover Image
                    </Button>
                </div>
                <div id="input-meta_keywords">
                    <TextField
                        label={"Meta keywords"}
                        fullWidth
                        placeholder="meta keywords..."
                        name="meta_keywords"
                        multiline
                        rows={2}
                        defaultValue={blog?.meta_keywords}
                    />
                </div>
                <Box
                    sx={{
                        pt: 2
                    }}
                >
                    <LoadingButton
                        variant={"contained"}
                        // fullWidth
                        type={"submit"}
                        loading={status === "pending"}
                    >
                        {
                            status === "pending" ?
                                blog ?
                                    "Updating"
                                    :
                                    "Creating...."
                                :
                                blog ?
                                    "Update"
                                    :
                                    "Create"
                        }
                    </LoadingButton>
                    {
                        blog && <Confirm
                            // @ts-ignore
                            render_button={btn => <Button sx={{ ml: 1 }} color="error" {...btn} disabled={status === "pending"}>
                                Delete Blog
                            </Button>}

                            action={handleDelete}
                        />
                    }
                </Box>
            </Stack>
        </Container >
    );
}

export default BlogForm;