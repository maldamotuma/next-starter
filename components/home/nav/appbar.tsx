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

const pages = [
  {
    title: "Bookmarks",
    href: "/bookmarks"
  },
  {
    title: "Pricing",
    href: "#"
  },
  {
    title: "Blog",
    href: "#"
  },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const user = useAppSelector(state => state.auth.user);
  const theme = useTheme();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" elevation={0}
      sx={{
        bgcolor: theme => alpha(theme.palette.background.paper, .5),
        backdropFilter: "blur(14px)",
        color: "primary.dark",
        borderBottom: 1,
        borderColor: "divider",
        position: "sticky",
        top: 0,
        zIndex: 999
      }}
    >
      <Box sx={{ px: 5 }}>
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
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
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
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={Link}
                href={page.href}
                onClick={handleCloseNavMenu}
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
  );
}
export default ResponsiveAppBar;
