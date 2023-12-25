"use client"

import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import {
    Button,
    Stack,
    TextField,
    Box,
    InputLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Collapse,
    IconButton
} from "@mui/material";
import {
    Company
} from "./types";
import PlaygroundApp from "@/malda_rte/rte/App";
import { LoadingButton } from "@mui/lab";
import { rulesAndMessagedType, useValidator } from "@malda/react-validator";
import { useRemoteCall } from "@/hooks/remote-call";
import { server_url } from "@/config/variables";
import Confirm from "../confirmation";
import { Close } from "@mui/icons-material";
import { useSnackbar } from "notistack";

interface CompanyFormProps {
    close(): void;
    cpy: Company | null;
    alterCopy(cp: Company, edit: boolean): void;
    deleteCopy(cp_id: number): void;
}

const CompanyForm: FunctionComponent<CompanyFormProps> = ({
    close,
    cpy,
    alterCopy,
    deleteCopy
}) => {
    const rules: rulesAndMessagedType = {
        rules: {
            title: ['required']
        },
        files: {
            rules: {
                image: {
                    required: cpy ? false : true,
                    maxSize: 2048
                }
            }
        }
    }
    const { validate } = useValidator("company-copy-form", rules);
    const { axios, status } = useRemoteCall();
    const [image, setImage] = useState<File | null>(null);
    const [content, setContent] = useState<string>(cpy?.content || "");
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();

    const handleSubmt = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate(async () => {
            if (!content) {
                enqueueSnackbar("Blog box must be a minimum of 300 chars.", {
                    variant: "info",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center"
                    },
                    action: <IconButton onClick={() => closeSnackbar()}><Close /></IconButton>
                });
                return;
            }
            const formdata = new FormData(e.currentTarget);
            formdata.append('content', content);
            const res = await axios.post(cpy ? `/update-copy/${cpy.id}` : "/create-copy", {
                ky: "copy",
                formdata
            });
            if (res) {
                close();
                alterCopy(res, cpy ? true : false);
            }
        });
    }

    const handleDelete = (copy_id: number) => {
        axios.post(`/delete-copy/${copy_id}`, {
            successCallBack() {
                deleteCopy(copy_id);
                close();
            },
        });
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setImage(e.target.files[0])
    }
    return (
        <Stack
            sx={{
                width: "100%",
                maxWidth: "lg"
            }}
            gap={2}
            component={"form"}
            onSubmit={handleSubmt}
            id={"company-copy-form"}
        >
            <div id="input-title">
                <TextField
                    fullWidth
                    placeholder={"policies and regulations"}
                    label={"Title"}
                    name="title"
                    defaultValue={cpy?.title}
                />
            </div>
            <Box>
                <InputLabel sx={{ mb: 2 }}>Content</InputLabel>
                <Box className="malda-rte" sx={{
                    "& .toolbar": {
                        top: "0 !important"
                    }
                }}>
                    <PlaygroundApp
                        settings={{
                            showTreeView: false
                        }}
                        onChange={nv => setContent(nv)}
                        value={cpy?.content}
                        minChars={300}
                    />
                </Box>
            </Box>
            <Box>
                <Collapse
                    in={image !== null || cpy?.image !== null}
                >
                    <Box>
                        {
                            (image || cpy?.image) && <Box component={"img"} src={image ? URL.createObjectURL(image) : `${server_url}/blog/${cpy?.image}?width=1000`} sx={{ width: "100%", aspectRatio: "5/3", objectFit: "cover" }} />
                        }
                    </Box>
                </Collapse>
                <div id="input-image">
                    <Button
                        variant={"contained"}
                        disableElevation
                        component={"label"}
                    >
                        <input
                            type={"file"}
                            name={"image"}
                            style={{
                                display: "none"
                            }}
                            onChange={handleImageChange}
                        />
                        Choose Image
                    </Button>
                </div>
            </Box>
            <div id="input-is_active">
                <FormControl>
                    <FormLabel id="is_active-radio">Status</FormLabel>
                    <RadioGroup
                        aria-labelledby="is_active-radio"
                        defaultValue={cpy ? cpy.is_active : 1}
                        name="is_active"
                    >
                        <FormControlLabel value={1} control={<Radio />} label="Active" />
                        <FormControlLabel value={0} control={<Radio />} label="Inactive" />
                    </RadioGroup>
                </FormControl>
            </div>
            <Box
                sx={{
                    pt: 2
                }}
            >
                <LoadingButton
                    loading={status === "pending"}
                    sx={{
                        mr: 2
                    }}
                    variant={"contained"} type="submit">Submit</LoadingButton>

                {
                    cpy &&
                    <Confirm
                        button_text="Delete Copy"
                        action={() => handleDelete(cpy?.id || 0)}
                        button={{
                            disabled: status === "pending"
                        }}
                    />
                }
            </Box>
        </Stack>
    );
}

export default CompanyForm;