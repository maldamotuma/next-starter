"use client";

import { useInitialList, useRemoteCall } from "@/hooks/remote-call";
import { Close, ContactEmergencyRounded, DeleteForeverOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Box, CardHeader, Grid, IconButton, IconButtonProps, List, ListItem, ListItemText } from "@mui/material";
import { FunctionComponent } from "react";
import Confirm from "../confirmation";
import moment from "moment";

type Contact = {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    contact_methode?: string;
    created_at: string;
}
interface ContactsProps {

}

const Contacts: FunctionComponent<ContactsProps> = () => {
    const {
        data: contacts,
        handleDelete: delContact,
        renderDialog,
        handleEdit,
        edit,
        close,
        renderList
    } = useInitialList<Contact>("/contacts", {
        ky: "contacts"
    });
    const { axios, status } = useRemoteCall();

    const handleDelete = (contact_id: number) => {
        axios.post(`/delete-contact/${contact_id}`, {
            successCallBack() {
                delContact(contact_id);
                close();
            },
        })
    }

    return (
        <Box sx={{
            maxWidth: "md"
        }}>
            {
                renderDialog({
                    txt: {
                        btn_txt: "",
                        header: edit?.subject || ""
                    },
                    frm: <Box>
                        <CardHeader
                            title={edit?.subject}
                            subheader={edit?.message}
                            sx={{
                                p: 0
                            }}
                            action={<>
                                <Confirm
                                    action={() => handleDelete(edit?.id || 0)}
                                    render_button={btnprps => (<IconButton
                                        disabled={status === "pending"}
                                        {...btnprps as IconButtonProps}
                                        color={"error"}
                                    >
                                        <DeleteForeverOutlined />
                                    </IconButton>)}
                                />
                            </>}
                        />
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={"Name"}
                                    secondary={edit?.name}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={"Email"}
                                    secondary={edit?.email}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={"Contact Methode"}
                                    secondary={edit?.contact_methode}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={"Timestamp"}
                                    secondary={moment(edit?.created_at).fromNow()}
                                />
                            </ListItem>
                        </List>
                    </Box>,
                    dialogProps: {
                        fullWidth: true,
                        maxWidth: "md"
                    }
                })
            }
            {
                renderList(
                    contacts.map(contact => (
                        <CardHeader
                            key={"contact-" + contact.id}
                            title={contact.subject}
                            subheader={contact.message}
                            action={<>
                                <IconButton
                                    onClick={() => handleEdit(contact)}
                                    disabled={status === "pending"}
                                >
                                    <VisibilityOutlined />
                                </IconButton>
                                <Confirm
                                    action={() => delContact(contact.id)}
                                    render_button={btnprps => (<IconButton
                                        disabled={status === "pending"}
                                        color={"error"}
                                        {...btnprps as IconButtonProps}
                                    >
                                        <DeleteForeverOutlined />
                                    </IconButton>)}
                                />
                            </>}
                        />
                    ))
                )
            }
        </Box>
    );
}

export default Contacts;