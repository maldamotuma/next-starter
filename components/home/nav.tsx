"use client";

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
import { ChevronRight } from '@mui/icons-material';
import AccountDD from '../nav/accountDropDown';
import AuthButton from '../nav/AuthButton';
import Link from 'next/link';
import { server_url } from '@/config/variables';
import { useTheme } from '@mui/material';

const pages = ['Products', 'Pricing', 'Blog'];

interface ResponsiveAppBar {
  handleOpen(): void;
  open: boolean;
}
function ResponsiveAppBar({ handleOpen, open }: ResponsiveAppBar) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="sticky" sx={{ top: 0, bgcolor: "background.paper", color: "primary.dark", borderBottom: 1, borderColor: "divider" }} elevation={0}>
      <Container maxWidth="xl" sx={{
        maxWidth: "9000px !important"
      }}>
        <Toolbar disableGutters>
          {
            !open &&
            <IconButton onClick={handleOpen}>
              <ChevronRight sx={{ color: "primary.dark" }} />
            </IconButton>
          }
          <Link href="/dashboard">
            <Box
              component={'img'}
              src={`${server_url}/logo/logo-${theme.palette.mode === "dark" ? "light" : "dark"}.png`}
              height={50}
            />
          </Link>
          <Box
            sx={{
              flexGrow: 1
            }}
          />
          <Box sx={{ flexGrow: 0 }}>
            <AuthButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
