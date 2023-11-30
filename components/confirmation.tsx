import { Warning } from "@mui/icons-material";
import { Alert, Button, ButtonProps, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, ListItem, ListItemIcon, ListItemText, MenuItemProps, TextField } from "@mui/material";
import { bindDialog, bindTrigger } from "material-ui-popup-state";
import { usePopupState } from "material-ui-popup-state/hooks";
import { FunctionComponent, ReactNode, useEffect, useRef, useState } from "react";

interface ConfirmProps {
    button?: ButtonProps;
    button_text?: string;
    action(): void;
    render_button?: (btn: MenuItemProps) => ReactNode;
}

const Confirm: FunctionComponent<ConfirmProps> = ({
    button, button_text, action, render_button
}) => {
    const popupstate = usePopupState({ variant: "dialog" });
    const [code, setCode] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const inpRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (popupstate.isOpen) {
            setCode(null);
            setMessage(null);
        }

        return () => {

        }
    }, [popupstate.isOpen])

    const handle_generate_code = () => {
        setCode(`${Math.floor(Math.random() * 1000)}`);
    }

    const handle_confirm = () => {
        if (inpRef.current?.value !== `${code}`) {
            setMessage("Incorrect Entry. Confirmation Failed")
            return;
        }
        popupstate.close();
        action();
    }

    return (
        <>
            {
                render_button ?
                    render_button({ ...bindTrigger(popupstate) })
                    :
                    <Button
                        variant={"outlined"}
                        color={"error"}
                        {...button} {...bindTrigger(popupstate)}>
                        {
                            button_text
                        }
                    </Button>
            }
            <Dialog
                {...bindDialog(popupstate)}
            >
                <DialogTitle>
                    <ListItem>
                        <ListItemIcon>
                            <Warning />
                        </ListItemIcon>
                        <ListItemText
                            primary={"Confirmation"}
                            secondary={"Are you sure To Delete? The action is irreversible."}
                        />
                    </ListItem>
                </DialogTitle>
                <DialogContent>
                    Write the the below code in the text box to confirm your action <br />
                    {
                        code ? <strong>{code}</strong> : <Button onClick={handle_generate_code}>View Code</Button>
                    }
                    <Collapse
                        in={message !== null}
                    >
                        <Alert severity="info">
                            {message}
                        </Alert>
                    </Collapse>
                    <TextField
                        fullWidth
                        placeholder={"Write Here"}
                        sx={{
                            mt: 1
                        }}
                        inputRef={inpRef}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant={"outlined"}
                        onClick={handle_confirm}
                    >
                        Confirm
                    </Button>
                    <Button
                        variant={"contained"}
                        onClick={() => popupstate.close()}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Confirm;