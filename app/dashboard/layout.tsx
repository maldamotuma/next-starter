"use client"

import ResponsiveAppBar from '@/components/home/nav'
import { Box, Stack } from '@mui/material'
import Siebar from '@/components/home/Sidebar'
import { ReactNode, useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'
import VerifyEmail from '@/components/auth/verifyEmail'

interface DashboardLayoutProps {
    children: ReactNode;
}
export default function Home({ children }: DashboardLayoutProps) {
    const [width, setWidth] = useState<0 | 300>(300);
    const auth = useAppSelector(state => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (auth.status !== "pending" && !auth.user) {
            router.push("/")
        }

        return () => {

        }
    }, [auth])


    const handleOpen = () => {
        setWidth(300);
    }

    const handleClose = () => {
        setWidth(0);
    }

    if (auth.status === "pending") {
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
                <ResponsiveAppBar handleOpen={handleOpen} open={width === 300} />
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
