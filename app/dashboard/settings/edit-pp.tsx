"use client"

import Title from "@/components/home/title";
import { usePrevious } from "@/hooks/hooks";
import { useRemoteCall } from "@/hooks/remote-call";
import { setAuthUser } from "@/redux/slices/auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { bindDialog, usePopupState } from "material-ui-popup-state/hooks";
import { ChangeEvent, FunctionComponent, useState } from "react";

interface EditPPProps {

}

const EditPP: FunctionComponent<EditPPProps> = () => {
    const pps = usePopupState({ variant: "dialog" });
    const [pp, setPp] = useState<File | null>(null);
    const { axios, status } = useRemoteCall();
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const statusPrev = usePrevious(status);

    const handle_pp_change = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPp(e.target.files[0]);
            pps.open();
        }
    }

    const handle_pp_submit = async () => {
        pps.close();
        const formdata = new FormData();
        formdata.append("image", pp || "");
        const res = await axios.post("/update-profile-picture", {
            formdata,
            ky: "profile_picture"
        })
        if (res) dispatch(setAuthUser(user ? { ...user, profile_picture: res } : null));
    }

    return (
        <>
            {
                status === "pending" ?
                    <Typography color="info.dark">Uploading...</Typography>
                    :
                    statusPrev === "pending" && status === "idle" ?
                        <Typography color="success.dark">Updated</Typography>
                        :
                        <Button
                            size="small"
                            component="label"
                        >
                            <input
                                type="file"
                                accept="images/*"
                                style={{
                                    display: "none"
                                }}
                                onChange={handle_pp_change}
                            />
                            Update Profile Picture
                        </Button>
            }
            <Dialog
                {...bindDialog(pps)}
                fullWidth
                maxWidth={"sm"}
            >
                <DialogTitle>
                    <Title
                        primary="Continue Uploading?"
                        primaryProps={{
                            fontSize: "1em",
                            fontWeight: 400
                        }}
                        secondaryProps={{
                            sx: {
                                mb: 0,
                                pb: 0
                            }
                        }}
                    />
                </DialogTitle>
                <DialogContent>
                    {
                        pp &&
                        <Box
                            component={"img"}
                            alt={""}
                            src={URL.createObjectURL(pp)}
                            width={"100%"}
                            style={{
                                aspectRatio: "1/1",
                                objectFit: "cover",
                                borderRadius: "5px"
                            }}
                        />
                    }
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handle_pp_submit}
                        variant="contained">Got it</Button>
                    <Button
                        onClick={pps.close}
                    >Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditPP;