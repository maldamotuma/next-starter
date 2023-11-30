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
      <Typography component={Link} color="inherit" href="https://mui.com/">
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
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis accusantium excepturi eum quaerat id vero molestiae explicabo veniam nostrum, veritatis autem eaque, laborum eveniet. Tempora asperiores reiciendis ullam culpa.
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
                      <ListItemButton key={item} component={Link} href="#"
                        sx={{
                          color: "primary.main",
                          fontWeight: 500
                        }}
                      >
                        {item}
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