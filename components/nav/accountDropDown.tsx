"use client"

import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface AccountDDProps {
    
}
 
const AccountDD: FunctionComponent<AccountDDProps> = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
      };

      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
    return (
        <div>
        <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
        </div>
    );
}
 
export default AccountDD;