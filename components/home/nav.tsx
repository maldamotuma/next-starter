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
import SearchBlog from '../nav/Search';

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
              sx={{
                mr: 2
              }}
            />
          </Link>
          <SearchBlog />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
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
