"use client"

import { Box, ButtonProps, Dialog, Stack, Tab, Tabs } from "@mui/material";
import { usePopupState, bindTrigger, bindDialog } from "material-ui-popup-state/hooks";
import { FunctionComponent, ReactNode, SyntheticEvent, useState } from "react";
import SigninForm from "./signin/form";
import SignUpForm from "./signup/form";
import { indigo } from "@mui/material/colors";

interface AuthModalProps {
    btn(btnProps: ButtonProps): ReactNode
}
 
const AuthModal: FunctionComponent<AuthModalProps> = ({btn}) => {
    const pps = usePopupState({variant: "dialog", popupId: "account-dialog"});
    const [tab, settab] = useState<"signin" | "signup">("signin");

    const handleTabChabge = (e: SyntheticEvent, nv: "signin" | "signup") => {
        settab(nv);
    }

    return (
        <>
        {
            btn({...bindTrigger(pps)})
        }
        <Dialog
        {...bindDialog(pps)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
            sx: {
                position: "absolute",
                top: "100px"
            }
        }}
        >
            <Stack>
                <Tabs
                onChange={handleTabChabge}
                variant="fullWidth"
                value={tab}
                TabIndicatorProps={{
                    sx: {
                        bgcolor: indigo[900],
                        height: '100%',
                        zIndex: 1
                    }
                }}
                textColor="inherit"
                >
                    <Tab label="SignIn" value={"signin"}
                    sx={{
                        "&.Mui-selected": {
                            color: "white",
                            zIndex: 2,
                        },
                        // position: "relative"
                    }}
                    />
                    <Tab label="SignUp" value={"signup"}
                    sx={{
                        "&.Mui-selected": {
                            color: "white",
                            zIndex: 2,
                        },
                        // position: "relative"
                    }}
                    />
                </Tabs>
                <Box
                sx={{
                    p: 3
                }}
                >
                {
                    tab === "signin" ?
                    <SigninForm modal/>
                    :
                    <SignUpForm modal />
                }
                </Box>
            </Stack>
        </Dialog>
        </>
    );
}
 
export default AuthModal;