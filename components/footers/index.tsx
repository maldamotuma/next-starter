"use client"

import { Button, Container, Grid, List, ListItemButton, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
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
    <Container
      maxWidth="md"
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 8,
        py: [3, 6],
      }}
    >
      <Grid container spacing={4} justifyContent="space-evenly">
        {footers.map((footer) => (
          <Grid item xs={6} sm={3} key={footer.title}>
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
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

export default Footers;