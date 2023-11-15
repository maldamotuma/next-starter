"use client"

import Image from 'next/image'
import ResponsiveAppBar from '@/components/home/nav'
import { Box, Stack } from '@mui/material'
import Siebar from '@/components/home/Sidebar'
import { ReactNode, useState } from 'react'

interface DashboardLayoutProps {
    children: ReactNode;
}
export default function Home({ children }: DashboardLayoutProps) {
    const [width, setWidth] = useState<0 | 300>(300);

    const handleOpen = () => {
        setWidth(300);
    }

    const handleClose = () => {
        setWidth(0);
    }

    return (
        <Stack
            direction={"row"}
        >
            <Box
                sx={{
                    display: {
                        xs: "none",
                        md: "block"
                    },
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
                <Box>
                    {
                        children
                    }
                </Box>
            </Box>
        </Stack>
    )
}
