"use client"

import { ButtonProps, Dialog } from "@mui/material";
import { usePopupState, bindTrigger, bindDialog } from "material-ui-popup-state/hooks";
import { FunctionComponent, ReactNode } from "react";
import Tabform from "./tabForm";

interface AuthModalProps {
    btn(btnProps: ButtonProps): ReactNode
}

const AuthModal: FunctionComponent<AuthModalProps> = ({ btn }) => {
    const pps = usePopupState({ variant: "dialog", popupId: "account-dialog" });


    return (
        <>
            {
                btn({ ...bindTrigger(pps) })
            }
            <Dialog
                {...bindDialog(pps)}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        position: "absolute",
                        top: 0
                    }
                }}
            >
                <Tabform />
            </Dialog>
        </>
    );
}

export default AuthModal;