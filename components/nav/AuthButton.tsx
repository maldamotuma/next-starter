"use client"

import { FunctionComponent, useContext } from "react";
import AccountDD from "./accountDropDown";
import AuthModal from "../auth/authModal";
import { Button, IconButton, Tooltip, useTheme } from "@mui/material";
import { DarkMode, LightMode, Person4 } from "@mui/icons-material";
import { useAppSelector } from "@/redux/store";
import { ColorModeContext } from "../wrappers/wholeWrapper";

interface AuthButtonProps {

}

const AuthButton: FunctionComponent<AuthButtonProps> = () => {
    const { user } = useAppSelector(state => state.auth);
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <div style={{display: "flex", alignItems: "center"}}>
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
                            btn={bp => <Button startIcon={<Person4 />} {...bp} variant='contained'>SignIn / SignUp</Button>}
                        />
                }
            </div>
        </div>
    );
}

export default AuthButton;