"use client";

import { Close, ContactEmergency, GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import { Avatar, Box, CardHeader, Fab, Fade, IconButton, Paper } from "@mui/material";
import { FunctionComponent, useState } from "react";
import ContactForm from "./form";
import { StyledBadge } from "../home/hero/avatars";

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
                        <IconButton color="primary"><LinkedIn /></IconButton>
                        <IconButton><GitHub /></IconButton>
                        <IconButton color="info"><Twitter /></IconButton>
                    </Box>
                    <Box
                        sx={{
                            p: 3
                        }}
                    >
                        <ContactForm formId={"floating-contact-form"} />
                    </Box>
                </Paper>
            </Fade>
        </>
    );
}

export default FloatingContact;