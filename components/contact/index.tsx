"use client";

import { Close, ContactEmergency, GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import { Avatar, Box, CardHeader, Fab, Fade, IconButton, Paper } from "@mui/material";
import { FunctionComponent, useState } from "react";
import ContactForm from "./form";
import { StyledBadge } from "../home/hero/avatars";
import Link from "next/link";
import SimpleBar from "simplebar-react";

interface FloatingContactProps {

}

const FloatingContact: FunctionComponent<FloatingContactProps> = () => {
    const [show, setShow] = useState<boolean>(false);
    return (
        <>
            <Fade
                in={!show}
            >
                <Fab
                    sx={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        gap: 1
                    }}
                    color="primary"
                    onClick={() => setShow(!show)}
                    variant="extended"
                >
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar
                            alt={"Malda Motuma"}
                            src="/malda.jpeg"
                        />
                    </StyledBadge>
                    Let Us Connect!
                </Fab>
            </Fade>
            <Fade
                in={show}
            >
                <Paper
                    sx={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        width: "calc(100% - 30px)",
                        maxWidth: 400,
                        zIndex: theme => theme.zIndex.fab,
                        borderRadius: 3
                    }}
                    elevation={10}
                >
                    <CardHeader
                        title={"We Value Your Input"}
                        action={<IconButton onClick={() => setShow(false)}><Close /></IconButton>}
                    />
                    <CardHeader
                        avatar={<StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar
                                alt={"Malda Motuma"}
                                src="/malda.jpeg"
                            />
                        </StyledBadge>}
                        title={"Malda Motuma"}
                        subheader={"Developer and Owner Of Tech-Scan"}
                        sx={{
                            py: 0
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            px: 2,
                            pl: 8
                        }}
                    >
                        <IconButton
                            color="primary"
                            component={Link}
                            target="_blank"
                            href="https://www.linkedin.com/in/malda-motuma-39b88a219"
                        ><LinkedIn /></IconButton>
                        <IconButton
                            component={Link}
                            target="_blank"
                            href="https://github.com/maldamotuma"
                        ><GitHub /></IconButton>
                        <IconButton
                            color="info"
                            component={Link}
                            target="_blank"
                            href="https://twitter.com/MaldaMotuma"
                        ><Twitter /></IconButton>
                    </Box>
                    <SimpleBar
                        style={{
                            padding: "20px",
                            maxHeight: "70vh",
                            width: "100%"
                        }}
                    >
                        <ContactForm formId={"floating-contact-form"} />
                    </SimpleBar>
                </Paper>
            </Fade>
        </>
    );
}

export default FloatingContact;