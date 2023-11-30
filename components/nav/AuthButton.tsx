"use client"

import { FunctionComponent, useContext } from "react";
import AccountDD from "./accountDropDown";
import AuthModal from "../auth/authModal";
import { Button, CircularProgress, IconButton, Tooltip, useTheme } from "@mui/material";
import { DarkMode, LightMode, Person4 } from "@mui/icons-material";
import { useAppSelector } from "@/redux/store";
import { ColorModeContext } from "../wrappers/wholeWrapper";
import { LoadingButton } from "@mui/lab";

interface AuthButtonProps {

}

const AuthButton: FunctionComponent<AuthButtonProps> = () => {
    const { user, status } = useAppSelector(state => state.auth);
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Toggle Theme" sx={{ mr: 1 }} disableInteractive>
                <IconButton
                    onClick={colorMode.toggleColorMode}
                >
                    {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
                </IconButton>
            </Tooltip>
            <div>
                {
                    user ?
                        <AccountDD />
                        :
                        <AuthModal
                            btn={bp => <>
                                <LoadingButton
                                    loadingPosition="start"
                                    loading={status === "pending"} startIcon={<Person4 />} {...bp}
                                    sx={{
                                        display: {
                                            xs: "none",
                                            md: "flex"
                                        }
                                    }}
                                    variant='contained'>SignIn / SignUp</LoadingButton>
                                <IconButton
                                    sx={{
                                        display: {
                                            md: "none"
                                        }
                                    }}
                                    {...bp}
                                    disabled={status === "pending"}
                                >
                                    {
                                        status === "pending" ?
                                            <CircularProgress size={20} />
                                            :
                                            <Person4 />
                                    }
                                </IconButton>
                            </>}
                        />
                }
            </div>
        </div>
    );
}

export default AuthButton;