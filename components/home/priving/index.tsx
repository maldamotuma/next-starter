"use client"

import { Check, DiamondOutlined, Star } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Container, GlobalStyles, Grid, Typography } from "@mui/material";
import { blue, blueGrey, indigo } from "@mui/material/colors";
import Link from "next/link";
import { FunctionComponent } from "react";


const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '10 users included',
      '2 GB of storage',
      'Help center access',
      'Email support',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

interface PricingProps {

}

const Pricing: FunctionComponent<PricingProps> = () => {
  return (
    <div style={{
      width: "100%"
    }}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <Container disableGutters maxWidth="sm" sx={{ pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Quickly build an effective pricing table for your potential customers with
          this layout. It&apos;s built with default MUI components with little
          customization.
        </Typography>
      </Container>
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Chip
                label={"Package Title"}
                color={tier.title === 'Pro' ? "secondary" : "info"}
                {
                ...(tier.title === 'Pro' && {
                  icon: <DiamondOutlined />
                })
                }
                sx={{
                  mx: "auto",
                  position: "relative",
                  mb: "-16px",
                  fontSize: 14,
                  px: 2
                }}
              />
              <Card
                // variant={"outlined"}
                elevation={5}
                sx={{
                  // minHeight: {
                  //   md: "500px"
                  // },
                  borderRadius: 5,
                  pb: 3,
                  width: "100%",
                  ...(tier.title === 'Pro' && {
                    border: 1,
                    borderColor: "secondary.main"
                  })
                }}
              >
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{
                    align: 'center'
                  }}
                  action={tier.title === 'Pro' ? <Star /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                    color: blue[50]
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? blue[900]
                        : theme.palette.grey[700],
                    color: "#ffffff",
                    pt: "20px"
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                      pt: 1
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <Typography variant="body2" align={"center"} color="text.secondary"
                    sx={{
                      px: 3
                    }}
                  >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam error excepturi! Expedita, reiciendis quam.
                  </Typography>
                  <CardActions sx={{
                    justifyContent: "center",
                    py: 3
                  }}>
                    <Button
                      size="large"
                      // fullWidth
                      variant={tier.buttonVariant as 'outlined' | 'contained'}
                      sx={{
                        borderRadius: 5
                      }}
                      component={Link}
                      href={"/plans/checkout"}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                  <Typography variant={"subtitle2"} align={"center"} sx={{ mb: 2 }}>
                    Package Includes:
                  </Typography>
                  <ul>
                    {tier.description.map((line) => (
                      <Box
                        key={line}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 1,
                          transition: "all .2s ease",
                          "&:hover": {
                            pl: 3,
                            color: "primary.main"
                          },
                          "&:hover .chk-itm": {
                            color: "primary.main"
                          }
                        }}
                      >
                        <Check className="chk-itm" sx={{ width: 18, height: 18, color: "text.secondary" }} />
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                        >
                          {line}
                        </Typography>
                      </Box>
                    ))}
                  </ul>
                </CardContent>

              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Pricing;