"use client"

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box } from '@mui/material';
import { BookmarkOutlined, Home, HomeOutlined, ManageAccountsOutlined, SearchOffOutlined, SearchOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AuthButton from '@/components/nav/AuthButton';

const mobile_links = [
    {
        icon: <HomeOutlined />,
        label: "Home",
        href: "/"
    },
    {
        icon: <SearchOutlined />,
        label: "Search",
        href: "/search"
    },
    {
        icon: <BookmarkOutlined />,
        label: "Bookmarks",
        href: "/bookmarks"
    }
]
export default function LabelBottomNavigation() {
    const path = usePathname();
    const [value, setValue] = React.useState(path);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                display: {
                    xs: "block",
                    md: "none"
                },
                position: "sticky",
                top: 0,
                zIndex: theme => theme.zIndex.appBar
            }}
        >
            <BottomNavigation
                sx={{
                    width: "100%"
                }}
                value={value}
                onChange={handleChange}
            >
                {
                    mobile_links.map(lnk => (
                        <BottomNavigationAction
                            label={lnk.label}
                            value={lnk.href}
                            key={lnk.href}
                            icon={lnk.icon}
                            component={Link}
                            href={lnk.href}
                        />
                    ))
                }
                <AuthButton />
            </BottomNavigation>
        </Box>
    );
}
