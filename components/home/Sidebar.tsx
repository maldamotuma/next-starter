import { server_url } from "@/config/variables";
import { useAppSelector } from "@/redux/store";
import { AddShoppingCartOutlined, AdminPanelSettingsOutlined, ArticleOutlined, BookmarkOutlined, CardMembershipOutlined, ChevronLeft, ChevronLeftOutlined, CircleOutlined, Dashboard, EmailOutlined, Error, ExpandMore, Group, GroupOutlined, Home, Inbox, Mail, ManageAccountsOutlined, Person4Outlined, PolicyOutlined, PostAdd, SupportAgentOutlined, Warning } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, CardHeader, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, accordionDetailsClasses, alpha, listItemIconClasses } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { FunctionComponent } from "react";
import SimpleBar from "simplebar-react";

interface SiebarProps {
  handleClose(): void
}

const links = [
  {
    title: "Navigation",
    childrens: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: <Dashboard />
      }
    ]
  },
  {
    title: "Company",
    childrens: [
      {
        title: "Copies",
        href: "/dashboard/company",
        icon: <PolicyOutlined />
      },
      {
        title: "Contact",
        href: "/dashboard/contact",
        icon: <SupportAgentOutlined />
      },
      {
        title: "Email List",
        href: "/dashboard/emails",
        icon: <EmailOutlined />
      }
    ]
  },
  {
    title: "Blog",
    childrens: [
      {
        title: "My Blogs",
        href: "/dashboard/blog/list",
        icon: <ArticleOutlined />
      },
      {
        title: "Create Blog",
        href: "/dashboard/blog/create",
        icon: <PostAdd />
      },
      {
        title: "Bookmarks",
        href: "/dashboard/bookmarks",
        icon: <BookmarkOutlined />
      },
    ]
  },
  {
    title: "Account",
    childrens: [
      {
        title: "Profile",
        href: "/dashboard/profile",
        icon: <Person4Outlined />
      },
      {
        title: "Edit Profile",
        href: "/dashboard/settings",
        icon: <ManageAccountsOutlined />
      },
      {
        title: "Change Password",
        href: "/dashboard/settings?tab=change-password",
        icon: <AdminPanelSettingsOutlined />
      },
    ]
  }
]
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
        <SimpleBar
          style={{
            height: "100%",
            width: "100%",
            overflowX: "hidden"
          }}
        >
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
                <ListItemButton
                  component={Link}
                  href={"/dashboard/blog/list"}
                >
                  <ListItemIcon>
                    <CircleOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Blogs"}
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
          {
            links.map(lnk => (
              <Box
                key={"links-qwerty-" + lnk.title}
              >
                <ListSubheader>{lnk.title}</ListSubheader>
                {
                  lnk.childrens.map(sb => (
                    <ListItemButton
                      key={"links-sub-qwerty-" + sb.title}
                      component={Link}
                      href={sb.href}
                    >
                      <ListItemIcon>
                        {
                          sb.icon
                        }
                      </ListItemIcon>
                      <ListItemText
                        primary={sb.title}
                      />
                    </ListItemButton>
                  ))
                }
              </Box>
            ))
          }
        </SimpleBar>
      </Box>
    </Stack >
  );
}

export default Siebar;