"use client"

import AdminForm from "@/components/admin/form";
import Confirm from "@/components/confirmation";
import UserForm from "@/components/user/form";
import { useSearch } from "@/components/user/search";
import { UserType } from "@/components/user/types";
import { server_url } from "@/config/variables";
import { useInitialCall, useInitialList, useRemoteCall } from "@/hooks/remote-call";
import { Close, MoreVert } from "@mui/icons-material";
import { Avatar, Box, Button, CardHeader, Dialog, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import PopupState from "material-ui-popup-state";
import { bindDialog, bindMenu, bindToggle, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { FunctionComponent, useEffect, useState } from "react";

interface UsersProps {

}

const Users: FunctionComponent<UsersProps> = () => {
    const {
        data: users,
        setData: setUsers,
        status,
        handleDelete: delUser,
        renderDialog,
        alterData: alterUsers,
        handleEdit,
        edit,
        close
    } = useInitialList<UserType>("/users", { ky: "users" });
    const { axios, status: del_status } = useRemoteCall();
    const { renderInput, renderResult } = useSearch<UserType>("users", {
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


    const handleDelete = (user_id: number) => {
        axios.post(`/delete-user/${user_id}`, {
            successCallBack() {
                delUser(user_id)
            },
        })
    }

    if (status === "pending") {
        return <>Loading...</>
    } else if (status === "rejected") {
        return <>Something Went Wrong!</>
    }
    return (
        <Box sx={{ maxWidth: "sm" }}>
            {
                renderDialog({
                    txt: {
                        btn_txt: "Add User",
                        header: edit ? "Edit User" : "Add User"
                    },
                    frm: <UserForm alterUsers={alterUsers} close={close} user={edit} />
                })
            }
            <Box sx={{py: 2}}>
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
                    users.length === 0 ?
                        <>No Data Found</>
                        :
                        users.map(user => (
                            <ListItem key={`user-${user.id}`}
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
                        ))
                }
            </List>
        </Box>
    );
}

export default Users;