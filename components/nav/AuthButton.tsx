"use client"

import { FunctionComponent, useContext } from "react";
import AccountDD from "./accountDropDown";
import AuthModal from "../auth/authModal";
import { BottomNavigationAction, Box, Button, CircularProgress, IconButton, Tooltip, useTheme } from "@mui/material";
import { DarkMode, LightMode, ManageAccountsOutlined, Person4 } from "@mui/icons-material";
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
        <Box sx={{ display: "flex", alignItems: "center", gap: { md: 1 } }}>
            <Tooltip title="Toggle Theme" sx={{ mr: 1 }} disableInteractive>
                <IconButton
                    onClick={colorMode.toggleColorMode}
                    sx={{
                        display: {
                            xs: "none",
                            md: "flex"
                        }
                    }}
                >
                    {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
                </IconButton>
            </Tooltip>
            <BottomNavigationAction
                sx={{
                    display: {
                        xs: "flex",
                        md: "none"
                    }
                }}
                icon={theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
                onClick={colorMode.toggleColorMode}
            />
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
                                <BottomNavigationAction
                                    sx={{
                                        display: {
                                            md: "none"
                                        }
                                    }}
                                    {...bp}
                                    icon={status === "pending" ? <CircularProgress size={20} /> : <ManageAccountsOutlined />}
                                    disabled={status === "pending"}
                                />
                            </>}
                        />
                }
            </div>
        </Box>
    );
}

export default AuthButton;