import { server_url } from "@/config/variables";
import { useAppSelector } from "@/redux/store";
import { ChevronLeft, ChevronLeftOutlined, ExpandMore, Inbox, Mail } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, CardHeader, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
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
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <Accordion
          disableGutters
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
                <ListItemText
                  primary={"Sections"}
                />
              </ListItemButton>
              <ListItemButton
                component={Link}
                href={"/dashboard/categories"}
              >
                <ListItemText
                  primary={"Categories"}
                />
              </ListItemButton>
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Stack>
  );
}

export default Siebar;