"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AccountDD from '@/components/nav/accountDropDown';
import { useAppSelector } from '@/redux/store';
import AuthModal from '@/components/auth/authModal';
import { Person4 } from '@mui/icons-material';
import AuthButton from '@/components/nav/AuthButton';
import { server_url } from '@/config/variables';
import Link from 'next/link';
import { alpha, useTheme } from '@mui/material';
import ComboBox from '@/components/nav/Search';
import LabelBottomNavigation from './mobile-appbar';

const pages = [
  {
    title: "Bookmarks",
    href: "/bookmarks"
  },
  {
    title: "Plans",
    href: "/plans"
  },
  {
    title: "Contact",
    href: "/#contact"
  },
];

function ResponsiveAppBar() {
  const theme = useTheme();


  return (
    <>
      <LabelBottomNavigation />
      <AppBar position="static" elevation={0}
        sx={{
          bgcolor: theme => alpha(theme.palette.background.paper, .5),
          backdropFilter: "blur(14px)",
          color: "primary.dark",
          borderBottom: 1,
          borderColor: "divider",
          position: "sticky",
          top: 0,
          zIndex: 999,
          display: {
            xs: "none",
            md: "block"
          }
        }}
      >
        <Box sx={{
          px: 5
        }}>
          <Toolbar disableGutters>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center"
              }}
            >
              <Link href="/">
                <Box
                  component={'img'}
                  src={`${server_url}/logo/logo-${theme.palette.mode === "dark" ? "light" : "dark"}.png`}
                  height={50}
                />
              </Link>
              <ComboBox />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.title}
                  component={Link}
                  href={page.href}
                  sx={{ my: 2, display: 'block' }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <AuthButton />
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
