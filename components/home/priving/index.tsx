"use client"

import { Check, DiamondOutlined, Star } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Container, GlobalStyles, Grid, Typography } from "@mui/material";
import { blue, blueGrey, indigo } from "@mui/material/colors";
import Link from "next/link";
import { FunctionComponent } from "react";


export const tiers = [
  {
    chip: "Developer's Den",
    summary: "Access our blogs, coding assistance, and community forums for free.",
    title: 'Free',
    price: '0',
    description: [
      'Access to Premium Blogs',
      'Troubleshooting assistance',
      'Hosting Challenges Support',
      'Email support',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    chip: "Skill Builder",
    summary: "Dive deeper with dedicated time slots for personalized assistance and learning sessions",
    title: 'Pro',
    subheader: 'Most popular',
    price: '250',
    description: [
      'Access to Premium Blogs',
      'Troubleshooting assistance',
      'Hosting Challenges Support',
      'Help center access',
      'Priority email support',
      'Personalized Facetime Support',
      'Priority Access to New Content',
      'Exclusive Webinars and Workshops',
      'Extended Assistance Hours'
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    chip: "Tech Partner",
    summary: "Unlock the full potential of Tech-Scan with premium access to hire us for web and AI development projects.",
    title: 'Pro+',
    price: '##',
    description: [
      'Customized Development Solutions',
      'Dedicated Project Manager',
      'Priority Technical Support',
      'Exclusive Beta Access',
      'Strategic Consultations'
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
          fontSize={"3em"}
          fontWeight={500}
        >
          Pricing
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Choose Your Path to Tech Excellence: Our Flexible Pricing Plans
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
                label={tier.chip}
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
                        : blueGrey[900],
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
                    {
                      tier.summary
                    }
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
                      href={tier.title === "Free" ? "/auth/signin" : tier.title === "Pro" ? "/plans/checkout" : "/#contact"}
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