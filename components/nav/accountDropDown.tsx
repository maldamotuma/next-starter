"use client"

import { baseURL } from "@/config/axios";
import { server_url } from "@/config/variables";
import { useRemoteCall } from "@/hooks/remote-call";
import { setAuthUser } from "@/redux/slices/auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";

const settings = [{
  title: 'Profile',
  href: "/dashboard/profile"
}, {
  title: 'Account',
  href: "/"
}, {
  title: 'Dashboard',
  href: '/dashboard'
}];

interface AccountDDProps {

}

const AccountDD: FunctionComponent<AccountDDProps> = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch();
  const { axios, status } = useRemoteCall();
  const router = useRouter();


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await baseURL.get('/sanctum/csrf-cookie');
    await axios.post('/logout', {
      successMessage: "Suuccessfully Logged Out",
      successCallBack() {
        dispatch(setAuthUser(null));
        signOut({
          redirect: false
        }).then(() => {
          router.push("/");
        });
      },

    })
  }

  return (
    <div>
      <Tooltip title="Open settings" disableInteractive>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={`${user?.first_name} ${user?.last_name}`} src={`${server_url}/avatar/small/${user?.profile_picture}`} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            component={Link}
            href={setting.href}
            key={setting.title} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting.title}</Typography>
          </MenuItem>
        ))}
        <MenuItem
          disabled={status === "pending"}
          key={"Logout"} onClick={handleLogout}>
          <Typography textAlign="center">{status === "pending" ? "Logging Out..." : "Logout"}</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AccountDD;