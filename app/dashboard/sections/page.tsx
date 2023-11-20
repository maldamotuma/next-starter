"use client";

import Confirm from "@/components/confirmation";
import { sectionPrpos } from "@/components/sections/types";
import { useInitialCall, useRemoteCall } from "@/hooks/remote-call";
import { useValidator } from "@malda/react-validator";
import { AppRegistration, Delete } from "@mui/icons-material";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, List, ListItem, ListItemButton, ListItemText, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { PopupState, bindDialog, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { FormEvent, FunctionComponent, useEffect, useState } from "react";


interface SectionsProps {

}

const Sections: FunctionComponent<SectionsProps> = () => {
    const { data: sections, setData: setSections, status } = useInitialCall<sectionPrpos[]>("/sections", [], {
        ky: "sections"
    });
    const [edit, setEdit] = useState<sectionPrpos | undefined>(undefined);
    const pps = usePopupState({
        variant: "dialog"
    });
    const { axios, status: st } = useRemoteCall();


    useEffect(() => {
        if (!pps.isOpen) setEdit(undefined)

        return () => {

        }
    }, [pps.isOpen])


    const handleAddSection = (sctn: sectionPrpos, edit?: boolean) => {
        if (edit) {
            setSections(prev => prev.map(old_sctn => old_sctn.id === sctn.id ? sctn : old_sctn))
        } else {
            setSections(prev => ([sctn, ...prev]));
        }
    }

    const handleEdit = (sctn: sectionPrpos) => {
        setEdit(sctn);
        pps.open();
    }

    const handleDelete = async (sctn_id: number) => {
        axios.post(`/delete-section/${sctn_id}`, {
            successCallBack() {
                setSections(prev => prev.filter(pr => pr.id !== sctn_id))
            },
        })
    }

    return (
        <>
            <Button {...bindTrigger(pps)}>Add Section</Button>
            <Dialog
                {...bindDialog(pps)}
                fullWidth
                maxWidth={"sm"}
                onClose={() => { }}
            >
                <SectionForm
                    handleAddSection={handleAddSection}
                    pps={pps}
                    section={edit}
                />
            </Dialog>
            <List
                sx={{
                    maxWidth: "sm"
                }}
            >
                {
                    status === "idle" && sections?.length && sections.map((sctn: sectionPrpos) => (
                        <ListItem key={sctn.title}
                            secondaryAction={
                                <Stack direction="row" alignItems="center">
                                    <IconButton
                                        onClick={() => handleEdit(sctn)}
                                        title="Edit Section">
                                        <AppRegistration />
                                    </IconButton>
                                    <Confirm
                                        button_text=""
                                        action={() => handleDelete(sctn.id)}
                                        button={{
                                            startIcon: <Delete />,
                                            size: "small",
                                            sx: {
                                                px: 0,
                                                pl: 1,
                                                minWidth: "unset"
                                            },
                                            disabled: st === "pending"
                                        }}
                                    />
                                </Stack>
                            }
                        >
                            <ListItemText
                                primary={sctn.title}
                            />
                        </ListItem>
                    ))

                }
                {
                    status === "idle" && !sections?.length &&
                    <Alert severity="info">
                        No Record Added Yet
                    </Alert>
                }
                {
                    status === "pending" && <>Loading...</>
                }
                {
                    status === "rejected" && <>Something went wrong</>
                }
            </List>
        </>
    );
}

export default Sections;

const SectionForm = ({ handleAddSection, pps, section }: {
    handleAddSection(sctn: sectionPrpos, edit?: boolean): void;
    pps: PopupState;
    section?: sectionPrpos;
}) => {
    const { axios, status } = useRemoteCall();
    const { validate } = useValidator("section-form", {
        rules: {
            title: ['required']
        }
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate(async () => {
            const formdata = new FormData(e.currentTarget);
            const res = await axios.post(section ? `update-section/${section.id}` : "/add-section", {
                formdata,
                ky: "section"
            });
            if (res) handleAddSection(res, section ? true : false)
            pps.close();
        });
    }
    return (
        <Box
            sx={{
                width: "100%"
            }}
            component={"form"}
            id="section-form"
            onSubmit={handleSubmit}
        >
            <DialogTitle>
                <Typography fontSize="1.5em" fontWeight={600}>{section ? "Edit" : "Add"} Section</Typography>
            </DialogTitle>
            <DialogContent>
                <div id="input-title">
                    <TextField
                        label={"Title"}
                        fullWidth
                        // autoFocus
                        name="title"
                        margin="normal"
                        defaultValue={section?.title}
                        sx={{
                            mb: 0
                        }}
                    />
                </div>
                <FormControl
                    margin="normal"
                >
                    <FormLabel>Status</FormLabel>
                    <RadioGroup
                        defaultValue={section ? section.is_active : 1}
                        name={"is_active"}
                    >
                        <FormControlLabel value={1} control={<Radio />} label="Active" />
                        <FormControlLabel value={0} control={<Radio />} label="Inactive" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} type="submit" disabled={status === "pending"}>{status === "pending" ? section ? "updating..." : "Adding..." : section ? "update section" : "Add Section"}</Button>
                <Button type="button" onClick={pps.close} disabled={status === "pending"}>Cancel</Button>
            </DialogActions>
        </Box>
    )
}