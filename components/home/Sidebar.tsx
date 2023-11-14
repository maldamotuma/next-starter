import { ChevronLeft, Inbox, Mail } from "@mui/icons-material";
import { Avatar, Box, CardHeader, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { FunctionComponent } from "react";

interface SiebarProps {
    handleClose(): void
}
 
const Siebar: FunctionComponent<SiebarProps> = ({handleClose}) => {
    return (
        <div>
            <Box sx={{}}>
            <CardHeader
            title={"Malda Motuma"}
            subheader={"Joined 2 days ago"}
            avatar={
                <Avatar
                src={"https://media.licdn.com/dms/image/C4E03AQGfTKRnJ9fMJQ/profile-displayphoto-shrink_800_800/0/1644941666838?e=2147483647&v=beta&t=cMwvN6UuPXX6ejO78PMune_3G3XxZRFjCDentBwJ_ow"}
                alt=""
                >
                    MM
                </Avatar>
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
                }}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </div>
    );
}
 
export default Siebar;