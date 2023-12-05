"use client"

import AdminForm from "@/components/admin/form";
import { AdminType } from "@/components/admin/types";
import Confirm from "@/components/confirmation";
import { useSearch } from "@/components/user/search";
import { server_url } from "@/config/variables";
import { useInitialCall, useRemoteCall } from "@/hooks/remote-call";
import { Close, MoreVert } from "@mui/icons-material";
import { Avatar, Box, Button, CardHeader, Dialog, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import PopupState from "material-ui-popup-state";
import { bindDialog, bindMenu, bindToggle, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import Script from "next/script";
import { FunctionComponent, useEffect, useState } from "react";

interface AdminsProps {

}

const Admins: FunctionComponent<AdminsProps> = () => {
    const { data: admins, setData: setAdmins, status } = useInitialCall<AdminType[]>("/admins", [], { ky: "admins" });
    const pps = usePopupState({ variant: "dialog" });
    const [edit, setEdit] = useState<AdminType | null>(null); // Stores Admin to be edited
    const { axios, status: del_status } = useRemoteCall();
    const { renderInput, renderResult } = useSearch<AdminType>("admins", {
        searchby: {
            first_name: "First Name",
            last_name: "Last Name",
            email: "Email",
            phone: "Phone",
        },
        rl: (user) => (
            <ListItem key={`user-search-${user.id}`}
                secondaryAction={
                    <PopupState variant="dialog">
                        {
                            ppsa => (
                                <>
                                    <IconButton {...bindToggle(ppsa)}>
                                        <MoreVert />
                                    </IconButton>
                                    <Menu
                                        {...bindMenu(ppsa)}
                                    >
                                        <MenuItem onClick={() => handleEdit(user)}>Edit</MenuItem>
                                        <Confirm
                                            action={() => handleDelete(user.id)}
                                            render_button={btn => <MenuItem {...btn} disabled={del_status === "pending"}>Delete</MenuItem>}
                                        />
                                    </Menu>
                                </>
                            )
                        }
                    </PopupState>
                }
            >
                <ListItemIcon>
                    <Avatar src={`${server_url}/avatar/small/${user.profile_picture}`} />
                </ListItemIcon>
                <ListItemText
                    primary={`${user.first_name} ${user.last_name}`}
                />
            </ListItem>
        )
    })

    useEffect(() => {
        if (!pps.isOpen) setEdit(null)

        return () => {

        }
    }, [pps.isOpen])

    const alterAdmins = (admin: AdminType, edit?: boolean) => {
        if (edit) {
            setAdmins(prev => prev.map(admn => admn.id === admin.id ? admin : admn));
        } else {
            setAdmins(prev => ([admin, ...prev]));
        }
    }

    const handleEdit = (admin: AdminType) => {
        pps.open();
        setEdit(admin);
    }

    const handleDelete = (admin_id: number) => {
        axios.post(`/delete-admin/${admin_id}`, {
            successCallBack() {
                setAdmins(prev => prev.filter(pr => pr.id !== admin_id))
            },
        })
    }

    if (status === "pending") {
        return <>Loading...</>
    } else if (status === "rejected") {
        return <>Something Went Wrong!</>
    }
    return (
        <Box sx={{maxWidth: "sm"}}>
            <Script id={"ggl-lnk"} async src="https://www.googletagmanager.com/gtag/js?id=G-YRJ9KDZNZ0" />
            <Script id={"google-analytics"}>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-YRJ9KDZNZ0');
                `}
            </Script>
            <Button {...bindTrigger(pps)}>Add Admin</Button>
            <Dialog {...bindDialog(pps)} onClose={() => { }}>
                <CardHeader
                    title={edit ? "Edit Admin" : "Add Admin"}
                    action={<IconButton onClick={pps.close}><Close /></IconButton>}
                />
                <Box sx={{ p: 3 }}>
                    <AdminForm alterAdmins={alterAdmins} close={pps.close} admin={edit} />
                </Box>
            </Dialog>
            <Box sx={{ py: 2 }}>
                {
                    renderInput
                }
                {
                    renderResult
                }
            </Box>
            <List sx={{
                maxWidth: "sm"
            }}>
                {
                    admins.length === 0 ?
                        <>No Data Found</>
                        :
                        admins.map(admin => (
                            <ListItem key={`admin-${admin.id}`}
                                secondaryAction={
                                    <PopupState variant="dialog">
                                        {
                                            ppsa => (
                                                <>
                                                    <IconButton {...bindToggle(ppsa)}>
                                                        <MoreVert />
                                                    </IconButton>
                                                    <Menu
                                                        {...bindMenu(ppsa)}
                                                    >
                                                        <MenuItem onClick={() => handleEdit(admin)}>Edit</MenuItem>
                                                        <Confirm
                                                            action={() => handleDelete(admin.id)}
                                                            render_button={btn => <MenuItem {...btn} disabled={del_status === "pending"}>Delete</MenuItem>}
                                                        />
                                                    </Menu>
                                                </>
                                            )
                                        }
                                    </PopupState>
                                }
                            >
                                <ListItemIcon>
                                    <Avatar src={`${server_url}/avatar/small/${admin.profile_picture}`} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={`${admin.first_name} ${admin.last_name}`}
                                />
                            </ListItem>
                        ))
                }
            </List>
        </Box>
    );
}

export default Admins;