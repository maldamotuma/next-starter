"use client"

import { Box, Button, Container, Grid, List, ListItemButton, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import Link from "next/link";
import { FunctionComponent } from "react";
import ForceTheme from "../forceTheme";
import { server_url } from "@/config/variables";


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Typography component={Link} color="inherit" href="https://tech-scan.com">
        Tech-Scan
      </Typography>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const footers = [
  {
    title: 'Company',
    description: [
      {
        title: "About",
        href: "/company/about-us"
      },
      {
        title: "FAQ",
        href: "/company/frequently-asked-questions"
      },
      {
        title: "Contact",
        href: "/#contact"
      },
      {
        title: "Terms and Conditions",
        href: "/company/terms-and-conditions"
      }
    ],
  },
  {
    title: 'Navigation',
    description: [
      {
        title: "Dashboard",
        href: "/dashboard"
      },
      {
        title: "Home",
        href: "/"
      },
      {
        title: "Bookmarks",
        href: "/bookmarks"
      },
      {
        title: "Pricing",
        href: "/plans"
      }
    ],
  },
  {
    title: 'Auth',
    description: [
      {
        title: "SignIn",
        href: "/auth/signin"
      },
      {
        title: "SignUp",
        href: "/auth/signup"
      },
      {
        title: "Forgot Password",
        href: "/auth/forgot-password"
      }
    ],
  },
  {
    title: 'Legal',
    description: [
      {
        title: "Privacy policy",
        href: "/company/privacy-policy"
      },
      {
        title: "Terms of use",
        href: "/company/terms-of-use"
      },
    ],
  },
];
interface FootersProps {

}

const Footers: FunctionComponent<FootersProps> = () => {
  return (
    <ForceTheme theme="dark">
      <Box
        sx={{
          bgcolor: blueGrey[900],
          width: "100%",
          mt: 8,
          py: [3, 6],
          position: "relative",
          zIndex: 1
        }}
      >
        <Container
          maxWidth="xl"
          component="footer"
        >
          <Grid container spacing={10}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                component={"img"}
                src={`${server_url}/logo/logo-light-large.png`}
                sx={{
                  width: "100%",
                  mb: 2
                }}
              />
              <Typography color={"text.secondary"}>
                Our curated collection of resources, personalized assistance, and professional services are designed to empower your journey in AI and full-stack development. Whether you&apos;re a coding enthusiast or a company seeking expert solutions, find your path to excellence here at Tech-Scan.
              </Typography>
            </Grid>
            <Grid
              item container
              xs={12}
              sm={6}
              md={8}
            >
              {footers.map((footer) => (
                <Grid item xs={6} sm={3} lg={3} key={footer.title}>
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    {footer.title}
                  </Typography>
                  <List>
                    {footer.description.map((item) => (
                      <ListItemButton key={item.href} component={Link} href={item.href}
                        sx={{
                          color: "primary.main",
                          fontWeight: 500
                        }}
                      >
                        {item.title}
                      </ListItemButton>
                    ))}
                  </List>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
    </ForceTheme>
  );
}

export default Footers;