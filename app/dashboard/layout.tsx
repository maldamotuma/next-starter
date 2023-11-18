"use client"

import ResponsiveAppBar from '@/components/home/nav'
import { Box, Container, Dialog, Drawer, Stack, useMediaQuery, useTheme } from '@mui/material'
import Siebar from '@/components/home/Sidebar'
import { ReactNode, useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'
import VerifyEmail from '@/components/auth/verifyEmail'
import { bindDialog, usePopupState } from 'material-ui-popup-state/hooks'
import Tabform from '@/components/auth/tabForm'
import Title from '@/components/home/title'

interface DashboardLayoutProps {
    children: ReactNode;
}
export default function Home({ children }: DashboardLayoutProps) {
    const [width, setWidth] = useState<0 | 300>(300);
    const auth = useAppSelector(state => state.auth);
    const router = useRouter();
    const theme = useTheme();
    const pps = usePopupState({
        variant: "dialog"
    });
    const matches = useMediaQuery(theme.breakpoints.down("md"));


    const handleOpen = () => {
        setWidth(300);
    }

    const handleClose = () => {
        setWidth(0);
    }

    if (auth.status !== "pending" && !auth.user) {
        return (
            <Container maxWidth={"sm"}>
                <Title
                    primary="Authentication Required"
                    secondary='you must authenticate before proceeding'
                />
                <Tabform noRedirect />
            </Container>
        )
    } else if (auth.status === "pending") {
        return (
            <>
                Loading...
            </>
        )
    } else if (auth.status === "rejected") {
        return (
            <>
                Something Went Wrong
            </>
        )
    }

    return (
        <Stack
            direction={"row"}
            alignItems={"flex-start"}
        >
            <Drawer
                {...bindDialog(pps)}
                sx={{
                    display: {
                        xs: "block",
                        md: "none"
                    }
                }}
            >
                <Box
                    sx={{
                        width: 240
                    }}
                >
                    <Siebar handleClose={pps.close} />
                </Box>
            </Drawer>
            <Box
                sx={{
                    display: {
                        xs: "none",
                        md: "block"
                    },
                    position: "sticky",
                    top: 0,
                    width,
                    borderRight: width === 300 ? 1 : 0,
                    borderColor: "divider",
                    height: "100vh",
                    overflowX: "hidden",
                    transition: ".3s width ease"
                }}
            >
                <Siebar handleClose={handleClose} />
            </Box>
            <Box
                sx={{
                    flex: 1,
                }}
            >
                <ResponsiveAppBar
                    handleOpen={matches ? pps.open : handleOpen}
                    open={matches ? pps.isOpen : width === 300}
                />
                <Box
                    sx={{
                        p: {
                            xs: 1,
                            md: 2,
                            lg: 3
                        }
                    }}
                >
                    {
                        auth.user?.email_verified_at ? children : <VerifyEmail />
                    }
                </Box>
            </Box>
        </Stack>
    )
}
