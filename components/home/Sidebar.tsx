import { server_url } from "@/config/variables";
import { useAppSelector } from "@/redux/store";
import { ChevronLeft, Inbox, Mail } from "@mui/icons-material";
import { Avatar, Box, CardHeader, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import moment from "moment";
import { FunctionComponent } from "react";

interface SiebarProps {
  handleClose(): void
}

const Siebar: FunctionComponent<SiebarProps> = ({ handleClose }) => {
  const { user } = useAppSelector(state => state.auth);
  return (
    <div>
      <Box sx={{}}>
        <CardHeader
          title={`${user?.first_name} ${user?.last_name}`}
          subheader={moment(user?.created_at).fromNow()}
          avatar={
            <Avatar
              src={`${server_url}/avatar/small/${user?.profile_picture}`}
              alt={`${user?.first_name} ${user?.last_name}`}
            />
          }
          titleTypographyProps={{
            noWrap: true
          }}
          subheaderTypographyProps={{
            noWrap: true
          }}
          action={<IconButton
            color="secondary"
            onClick={handleClose}
          >
            <ChevronLeft />
          </IconButton>}
        />
      </Box>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text}
                primaryTypographyProps={{
                  noWrap: true
                }}
                secondaryTypographyProps={{
                  noWrap: true
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} primaryTypographyProps={{
                noWrap: true
              }}
                secondaryTypographyProps={{
                  noWrap: true
                }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Siebar;