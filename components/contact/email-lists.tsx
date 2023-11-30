"use client"

import { useInitialList, useRemoteCall } from "@/hooks/remote-call";
import { Box, IconButton, IconButtonProps, ListItem, ListItemText } from "@mui/material";
import { FunctionComponent } from "react";
import Confirm from "../confirmation";
import { DeleteForeverOutlined } from "@mui/icons-material";

type Emails = {
    id: number;
    email: string;
}

interface EmailListsProps {

}

const EmailLists: FunctionComponent<EmailListsProps> = () => {
    const {
        data: emails,
        handleDelete: delEmail,
        close,
        renderList
    } = useInitialList<Emails>("/email-list", {
        ky: "emails"
    });
    const { axios, status } = useRemoteCall();

    const handleDelete = (eml_id: number) => {
        axios.post(`/delete-email/${eml_id}`, {
            successCallBack() {
                delEmail(eml_id);
                close();
            },
        })
    }
    return (
        <Box
            sx={{
                maxWidth: "sm"
            }}
        >
            {
                renderList(
                    emails.map(email => (
                        <ListItem
                            key={"email-" + email.id}
                            secondaryAction={<Confirm
                                action={() => handleDelete(email.id)}
                                render_button={btnprps => (<IconButton
                                    disabled={status === "pending"}
                                    color={"error"}
                                    {...btnprps as IconButtonProps}
                                >
                                    <DeleteForeverOutlined />
                                </IconButton>)}
                            />}
                        >
                            <ListItemText
                                primary={email.email}
                            />
                        </ListItem>
                    ))
                )
            }
        </Box>
    );
}

export default EmailLists;