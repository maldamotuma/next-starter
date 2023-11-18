"use client";

import Confirm from "@/components/confirmation";
import { sectionPrpos } from "@/components/sections/types";
import { useInitialCall, useRemoteCall } from "@/hooks/remote-call";
import { useValidator } from "@malda/react-validator";
import { AppRegistration, Delete } from "@mui/icons-material";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { PopupState, bindDialog, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { FormEvent, FunctionComponent, useEffect, useState } from "react";

type CategoryPrpos = {
    id: number;
    title: string;
    section_id: number;
    parent_id?: number;
    is_active: boolean;
}

interface CategoriesProps {

}

const Categories: FunctionComponent<CategoriesProps> = () => {
    const { data: categories, setData: setCategories, status } = useInitialCall<CategoryPrpos[]>("/categories", [], {
        ky: "categories"
    });
    const [edit, setEdit] = useState<CategoryPrpos | undefined>(undefined);
    const pps = usePopupState({
        variant: "dialog"
    });
    const { axios, status: st } = useRemoteCall();


    useEffect(() => {
        if (!pps.isOpen) setEdit(undefined)

        return () => {

        }
    }, [pps.isOpen])


    const handleAddCategory = (sctn: CategoryPrpos, edit?: boolean) => {
        if (edit) {
            setCategories(prev => prev.map(old_sctn => old_sctn.id === sctn.id ? sctn : old_sctn))
        } else {
            setCategories(prev => ([sctn, ...prev]));
        }
    }

    const handleEdit = (sctn: CategoryPrpos) => {
        setEdit(sctn);
        pps.open();
    }

    const handleDelete = async (sctn_id: number) => {
        axios.post(`/delete-category/${sctn_id}`, {
            successCallBack() {
                setCategories(prev => prev.filter(pr => pr.id !== sctn_id))
            },
        })
    }

    return (
        <>
            <Button {...bindTrigger(pps)}>Add category</Button>
            <Dialog
                {...bindDialog(pps)}
                fullWidth
                maxWidth={"sm"}
                onClose={() => { }}
            >
                <CategoryForm
                    handleAddCategory={handleAddCategory}
                    pps={pps}
                    category={edit}
                    categories={categories || []}
                />
            </Dialog>
            <List
                sx={{
                    maxWidth: 300
                }}
            >
                {
                    status === "idle" && categories?.length && categories.map((sctn: CategoryPrpos) => (
                        <ListItem key={sctn.title}
                            secondaryAction={
                                <Stack direction="row" alignItems="center">
                                    <IconButton
                                        onClick={() => handleEdit(sctn)}
                                        title="Edit category">
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
                    status === "idle" && !categories?.length &&
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

export default Categories;

const CategoryForm = ({ handleAddCategory, pps, category, categories }: {
    handleAddCategory(sctn: CategoryPrpos, edit?: boolean): void;
    pps: PopupState;
    category?: CategoryPrpos;
    categories: CategoryPrpos[]
}) => {
    const { data: sections, setData: setSections, status: sec_status } = useInitialCall<sectionPrpos[]>("/sections", [], {
        ky: "sections"
    });
    const { axios, status } = useRemoteCall();
    const [section, setsection] = useState<number | undefined>(category ? category.section_id : undefined);
    const { validate } = useValidator("category-form", {
        rules: {
            title: ['required']
        }
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate(async () => {
            const formdata = new FormData(e.currentTarget);
            const res = await axios.post(category ? `update-category/${category.id}` : "/add-category", {
                formdata,
                ky: "category"
            });
            if (res) handleAddCategory(res, category ? true : false)
            pps.close();
        });
    }
    return (
        <Box
            sx={{
                width: "100%"
            }}
            component={"form"}
            id="category-form"
            onSubmit={handleSubmit}
        >
            <DialogTitle>
                <Typography fontSize="1.5em" fontWeight={600}>{category ? "Edit" : "Add"} category</Typography>
            </DialogTitle>
            <DialogContent>
                <div id="input-title">
                    <TextField
                        label={"Title"}
                        fullWidth
                        // autoFocus
                        name="title"
                        margin="normal"
                        defaultValue={category?.title}
                        sx={{
                            mb: 0
                        }}
                    />
                </div>
                <div id="input-section_id">
                    <FormControl
                        margin="normal"
                        fullWidth
                    >
                        <InputLabel
                            id="section-label"
                        >Section</InputLabel>
                        <Select
                            name="section_id"
                            defaultValue={category ? category.section_id : ""}
                            label="Section"
                            labelId="section-label"
                            onChange={e => setsection(e.target.value ? parseInt(`${e.target.value}`) : undefined)}
                        >
                            <MenuItem disabled value="">Select Section</MenuItem>
                            {
                                sections?.map((sctn: any) => (
                                    <MenuItem value={sctn.id} key={"category-s-" + sctn.title}>{sctn.title}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div id="input-parent_id">
                    <FormControl
                        margin="normal"
                        fullWidth
                    >
                        <InputLabel
                            id="category-label"
                        >
                            Category
                        </InputLabel>
                        <Select
                            name="parent_id"
                            defaultValue={category ? category.parent_id : 0}
                            label="Category"
                            labelId="category-label"
                        >
                            <MenuItem value={0}>Main Category</MenuItem>
                            {
                                categories.filter(ct => `${ct.section_id}` === `${section}`).map(ctgry => (
                                    <MenuItem value={ctgry.id} key={"category-parent-s-" + ctgry.title} disabled={category?.id === ctgry.id}>{ctgry.title}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <FormControl
                    margin="normal"
                    fullWidth
                >
                    <FormLabel>Status</FormLabel>
                    <RadioGroup
                        defaultValue={category ? category.is_active : 1}
                        name={"is_active"}
                    >
                        <FormControlLabel value={1} control={<Radio />} label="Active" />
                        <FormControlLabel value={0} control={<Radio />} label="Inactive" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} type="submit" disabled={status === "pending"}>{status === "pending" ? category ? "updating..." : "Adding..." : category ? "update category" : "Add category"}</Button>
                <Button type="button" onClick={pps.close} disabled={status === "pending"}>Cancel</Button>
            </DialogActions>
        </Box>
    )
}