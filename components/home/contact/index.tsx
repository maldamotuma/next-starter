"use client"

import { Box, ButtonBase, CardContent, Chip, Container, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Title from "../title";
import Tabform from "@/components/auth/tabForm";
import { LocationOn } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import ContactForm from "@/components/contact/form";

interface ContactProps {

}

const Contact: FunctionComponent<ContactProps> = () => {
    return (
        <Container maxWidth="xl">
            <Stack
                sx={{
                    position: "relative"
                }}
                direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent={"space-between"} spacing={3}>
                <Box
                    sx={{
                        flex: 1,
                        maxWidth: "500px",
                        width: {
                            xs: "100%",
                            md: "35%"
                        }
                    }}
                >
                    <CardContent>
                        <Chip
                            label="contact us"
                            color="info"
                        />
                        <Title
                            primary="Contact"
                            secondary="Get In Touch With Us"
                            primaryProps={{
                                align: "left",
                                sx: {
                                    mb: 0,
                                    pb: 0
                                }
                            }}
                            secondaryProps={{
                                align: "left",
                                sx: {
                                    mb: 0,
                                    pb: 0
                                }
                            }}
                        />
                        <Typography sx={{ my: 2 }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa laboriosam odio possimus deleniti voluptates. Sapiente ad voluptatibus commodi optio in asperiores deserunt quis.
                        </Typography>
                        <List>
                            {
                                [1, 2, 3, 4].map(ct => (
                                    <ListItem
                                        key={"contact-c-" + ct}
                                        sx={{
                                            gap: 3,
                                            mb: 1
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                bgcolor: "primary.dark",
                                                p: 2,
                                                minWidth: "unset",
                                                borderRadius: 5
                                            }}
                                        >
                                            <LocationOn sx={{ color: theme => theme.palette.mode === "light" ? "#ffffff" : "#000000", width: 50, height: 50 }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={"Office Address:"}
                                            primaryTypographyProps={{
                                                fontSize: "1.3em",
                                                fontWeight: 600
                                            }}
                                            secondary={"Lorem ipsum dolor sit amet consectetur adipisicing elit!"}
                                        />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </CardContent>
                </Box>
                <Box
                    component={"img"}
                    alt={""}
                    src={"/contact.png"}
                    sx={{
                        width: "30%",
                        // height: "calc(100% + 50px)",
                        position: "absolute",
                        bottom: "-50px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 1,
                        display: {
                            xs: "none",
                            lg: "inline-block"
                        }
                    }}
                />
                <Paper
                    sx={{
                        // maxWidth: 500,
                        width: {
                            xs: "100%",
                            md: "35%"
                        },
                        p: 2,
                        display: "inline-block"
                    }}
                >
                    <Typography fontSize={"1.5em"} fontWeight={600} sx={{mb: 2}}>I value your Input</Typography>
                    <ContactForm formId="contact-form-on-page" />
                </Paper>
            </Stack>
            <Container
                sx={{
                    bgcolor: blueGrey[900],
                    py: 5,
                    mt: "50px",
                    borderRadius: 2
                }}
                maxWidth="md"
            >
                <Stack direction={{
                    xs: "column",
                    md: "row"
                }} justifyContent={"center"} gap={5}>
                    <Divider
                        sx={{
                            bgcolor: "#999"
                        }}
                        flexItem
                        orientation="vertical"
                    />
                    {
                        [1, 2, 3, 4].map(nmbr => (
                            <>
                                <ButtonBase
                                    key={`count-${nmbr}`}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    {/* <GroupOutlined
                        sx={{
                            width: 50,
                            height: 50,
                            color: "AppWorkspace"
                        }}
                    /> */}
                                    <Box>
                                        <Typography color={"#ffffff"} fontWeight={500} fontSize={"1.5em"} align="center">165k+</Typography>
                                        <Typography color={"#ffffff"} fontWeight={600} fontSize={"1.8em"} align="center">Clients</Typography>
                                    </Box>
                                </ButtonBase>
                                <Divider
                                    key={`dvdr-count-${nmbr}`}
                                    flexItem
                                    orientation="vertical"
                                    sx={{
                                        bgcolor: "#999"
                                    }}
                                />
                            </>
                        ))

                    }
                </Stack>
            </Container>
        </Container>
    );
}

export default Contact;