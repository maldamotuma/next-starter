"use client"

import Confirm from "@/components/confirmation";
import { useInitialList, useRemoteCall } from "@/hooks/remote-call";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import moment from "moment";
import { FunctionComponent } from "react";

interface ExceptionsProps {

}

type ExceptionType = {
    id: number;
    user_id?: number;
    admin_id?: number;
    message: string;
    name: string;
    when: string;
    description: string;
    created_at: string;
}

const Exceptions: FunctionComponent<ExceptionsProps> = () => {
    const { data: exceptions, handleDelete, renderList, renderDialog, handleEdit, edit } = useInitialList<ExceptionType>("/exceptions");
    const { status, axios } = useRemoteCall();

    const handle_Delete = (ex_id: number) => {
        axios.post(`/delete-exception/${ex_id}`, {
            successCallBack() {
                handleDelete(ex_id);
            },
        })
    }

    return renderList(
        <>
            {
                renderDialog({
                    txt: {
                        header: edit?.message || "",
                        btn_txt: ""
                    },
                    frm: <List sx={{ pt: 0 }}>
                        <ListItemText
                            primary={"Message"}
                            secondary={edit?.message}
                        />
                        <ListItemText
                            primary={"Name"}
                            secondary={edit?.name}
                        />
                        <ListItemText
                            primary={"When"}
                            secondary={edit?.when}
                        />
                        <ListItemText
                            primary={"Description"}
                            secondary={edit?.description}
                        />
                        <ListItemText
                            primary={"Happen"}
                            secondary={`${moment(edit?.created_at).fromNow()} - ${moment(edit?.created_at).format("MMM DD/YYYY HH:MM")}`}
                        />
                    </List>
                })
            }
            <List
                sx={{
                    maxWidth: "lg"
                }}
            >
                {
                    exceptions.map(ex => (
                        <ListItem
                            key={`Exceptions-${ex.id}`}>
                            <ListItemButton
                                onClick={() => handleEdit(ex)}
                            >
                                <ListItemText
                                    primary={ex.message}
                                    secondary={ex.when}
                                />
                            </ListItemButton>
                            <Confirm
                                action={() => handle_Delete(ex.id)}
                                button_text="Delete"
                                button={{
                                    disabled: status === "pending"
                                }}
                            />
                        </ListItem>
                    ))
                }
            </List>
        </>
    );
}

export default Exceptions;