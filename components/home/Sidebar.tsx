import { server_url } from "@/config/variables";
import { useAppSelector } from "@/redux/store";
import { ChevronLeft, ChevronLeftOutlined, CircleOutlined, Error, ExpandMore, Group, GroupOutlined, Inbox, Mail, Warning } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, CardHeader, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, accordionDetailsClasses, alpha, listItemIconClasses } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { FunctionComponent } from "react";

interface SiebarProps {
  handleClose(): void
}

const Siebar: FunctionComponent<SiebarProps> = ({ handleClose }) => {
  const { user } = useAppSelector(state => state.auth);
  return (
    <Stack sx={{ height: "100vh", overflow: "hidden" }}>
      <Box>
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
      <Box sx={{
        flexGrow: 1,
        overflow: "auto",
        [`& .${listItemIconClasses.root}`]: {
          minWidth: "unset",
          mr: 1
        },
        [`& .${accordionDetailsClasses.root}`]: {
          bgcolor: theme => alpha(theme.palette.divider, .05),
          py: 0,
          pl: 0,
          width: "calc(100% - 30px)",
          ml: "20px",
          mr: "10px",
          borderRadius: 5
        }
      }}>
        <Accordion
          // disableGutters
          variant="outlined"
          sx={{
            border: 0
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
          >
            Catalogue
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemButton
                component={Link}
                href={"/dashboard/sections"}
              >
                <ListItemIcon>
                  <CircleOutlined />
                </ListItemIcon>
                <ListItemText
                  primary={"Sections"}
                />
              </ListItemButton>
              <ListItemButton
                component={Link}
                href={"/dashboard/categories"}
              >
                <ListItemIcon>
                  <CircleOutlined />
                </ListItemIcon>
                <ListItemText
                  primary={"Categories"}
                />
              </ListItemButton>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion
          // disableGutters
          variant="outlined"
          sx={{
            border: 0
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
          >
            User Management
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemButton
                component={Link}
                href={"/dashboard/admin/list"}
              >
                <ListItemIcon>
                  <GroupOutlined />
                </ListItemIcon>
                <ListItemText
                  primary={"Admins"}
                />
              </ListItemButton>
              <ListItemButton
                component={Link}
                href={"/dashboard/user/list"}
              >
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText
                  primary={"Users"}
                />
              </ListItemButton>
            </List>
          </AccordionDetails>
        </Accordion>
        <ListItemButton
          component={Link}
          href={"/dashboard/exceptions"}
        >
          <ListItemIcon>
            <Error />
          </ListItemIcon>
          <ListItemText
            primary={"Exceptions"}
          />
        </ListItemButton>
        <ListItemButton
          component={Link}
          href={"/dashboard/nfp"}
        >
          <ListItemIcon>
            <Warning />
          </ListItemIcon>
          <ListItemText
            primary={"Not Found"}
          />
        </ListItemButton>
      </Box>
    </Stack >
  );
}

export default Siebar;