"use client"

import ResponsiveAppBar from '@/components/home/nav'
import { Box, Container, Dialog, Drawer, Stack, accordionClasses, alpha, listSubheaderClasses, useMediaQuery, useTheme } from '@mui/material'
import Siebar from '@/components/home/Sidebar'
import { ReactNode, useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'
import VerifyEmail from '@/components/auth/verifyEmail'
import { bindDialog, usePopupState } from 'material-ui-popup-state/hooks'
import Tabform from '@/components/auth/tabForm'
import Title from '@/components/home/title'
import { lightBlue } from '@mui/material/colors'
import CenterLoading from '@/components/loading/center'
import Footers from '@/components/footers'
import { server_url } from '@/config/variables'
import Link from 'next/link'
import FullBackDrop from '@/components/loading/full-back-drop'

interface DashboardLayoutProps {
    children: ReactNode;
}
export default function Home({ children }: DashboardLayoutProps) {
    const [width, setWidth] = useState<0 | 240>(240);
    const auth = useAppSelector(state => state.auth);
    const router = useRouter();
    const theme = useTheme();
    const pps = usePopupState({
        variant: "dialog"
    });
    const matches = useMediaQuery(theme.breakpoints.down("md"));


    const handleOpen = () => {
        setWidth(240);
    }

    const handleClose = () => {
        setWidth(0);
    }

    if (!auth.user) {
        return (
            <>
                <FullBackDrop open={auth.status === "pending"}/>
                <Container maxWidth={"sm"}
                    sx={{
                        py: 4,
                    }}>
                    <Link
                        href="/"
                    >
                        <Box
                            component={"img"}
                            src={`${server_url}/logo/logo-dark.png`}
                            alt={"Tech-Scan Logo"}
                            sx={{
                                display: "block",
                                height: 50,
                                boxSizing: "border-box",
                                px: 5,
                                mb: 2,
                                mx: "auto"
                            }}
                        />
                    </Link>
                    <Box
                        sx={{
                            border: 1,
                            borderColor: "divider",
                            py: 2,
                            pb: 2,
                            borderRadius: 2
                        }}
                    >
                        <Title
                            primary="Authentication Required"
                            secondary='you must authenticate before proceeding'
                        />
                        <Tabform noRedirect />
                    </Box>
                </Container>
                <Footers />
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
                    borderRight: width === 240 ? 1 : 0,
                    borderColor: "divider",
                    height: "100vh",
                    overflowX: "hidden",
                    transition: ".3s width ease",
                    // bgcolor: theme => theme.palette.mode === "light" ? alpha(lightBlue[100], .2) : alpha(lightBlue[900], .1),
                    // [`& .${accordionClasses.root}`]: {
                    //     bgcolor: "inherit",
                    // },
                    // [`& .${listSubheaderClasses.root}`]: {
                    //     bgcolor: "inherit",
                    // }
                }}
            >
                <Siebar handleClose={handleClose} />
            </Box>
            <Box
                sx={{
                    flex: 1,
                    width: {
                        xs: "100%",
                        md: `calc(100% - ${width}px)`
                    }
                }}
            >
                <ResponsiveAppBar
                    handleOpen={matches ? pps.open : handleOpen}
                    open={matches ? pps.isOpen : width === 240}
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
