"use client"

import { ArrowForwardIosOutlined, ArrowForwardOutlined, GroupOutlined, MailOutline, Person2 } from "@mui/icons-material";
import { Button, ButtonBase, Chip, Stack, Typography, Box, TextField, FormHelperText } from "@mui/material";
import { FunctionComponent } from "react";
import GroupAvatars from "./avatars";
import { useEmailSubscribe } from "@/hooks/subscribecta";
import { LoadingButton } from "@mui/lab";
import { TypeAnimation } from 'react-type-animation';
import Link from "next/link";

interface HeroTitleProps {

}

const HeroTitle: FunctionComponent<HeroTitleProps> = () => {
    const {
        handleChange,
        handleSubmit,
        loading
    } = useEmailSubscribe();

    return (
        <>
            <Chip
                label="Navigate The Tech Frontier"
                color="primary"
                variant="outlined"
                size="small"
                sx={{
                    position: "relative",
                    left: {
                        xs: "50%",
                        md: "0"
                    },
                    transform: {
                        xs: "translateX(-50%)",
                        md: "none"
                    },
                }}
            />
            <Typography
                variant="h1"
                component="h1"
                fontWeight={800}
                fontSize={{
                    xs: "2.5em",
                    md: "3.5em"
                }}
                sx={{
                    my: 1,
                    textAlign: {
                        xs: "center",
                        md: "left"
                    },
                    "& .anim": {
                        color: "primary.dark"
                    }
                }}
            >
                Empower Your Code Journey:
                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Code Support.',
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        'AI Insights.',
                        1000,
                        'Blog on React.',
                        1000,
                        'Blog on Laravel.',
                        1000,
                        'Blog on Python.',
                        1000
                    ]}
                    wrapper="span"
                    className="anim"
                    speed={50}
                    deletionSpeed={75}
                    style={{ marginLeft: "10px", display: 'inline' }}
                    repeat={Infinity}
                />
            </Typography>
            <Typography color={"GrayText"}
                sx={{
                    textAlign: {
                        xs: "center",
                        md: "left"
                    }
                }}
            >
                Elevate your projects with personalized code support, expert web development, and insightful blogs on React, Laravel, Python, AI, and more.
            </Typography>
            <Stack direction={"row"} spacing={2} alignItems={"center"} sx={{ mt: 2 }}>
                <div style={{ width: "100%" }}>
                    <form onSubmit={handleSubmit}>
                        <div id="input-sub-email">
                            <TextField
                                fullWidth
                                label="Email"
                                // size="small"
                                placeholder="yourmail@mail.com`"
                                onChange={handleChange}
                                InputProps={{
                                    // startAdornment: <MailOutline sx={{color: "text.secondary"}}/>
                                    endAdornment: <LoadingButton endIcon={<ArrowForwardOutlined />} variant="contained" disableElevation
                                        sx={{
                                            // borderTopRightRadius: 0,
                                            // borderBottomRightRadius: 0
                                        }}
                                        size="large"
                                        type={"submit"}
                                        loading={loading}
                                    >Join</LoadingButton>,
                                    sx: {
                                        // pr: .3
                                    }
                                }}
                            />
                        </div>
                    </form>
                    <FormHelperText
                        sx={{
                            textAlign: {
                                xs: "center",
                                md: "left"
                            }
                        }}
                    >
                        Your inbox deserves a dose of brilliance! Subscribe now and early access to groundbreaking content.
                    </FormHelperText>
                </div>
                {/* <Button endIcon={<ArrowForwardOutlined />} variant="contained" disableElevation>Join</Button> */}
            </Stack>
            <Button
                endIcon={<ArrowForwardIosOutlined />}
                variant="contained"
                fullWidth
                sx={{
                    maxWidth: 200,
                    mt: 2,
                    textTransform: "none"
                }}
                component={Link}
                href={"/dashboard"}
            >
                Get Started
            </Button>
            <Button
                startIcon={<Person2 />}
                // variant="outlined"
                // fullWidth
                sx={{
                    // maxWidth: 200,
                    mt: 2,
                    ml: 2,
                    textTransform: "none"
                }}
                component={Link}
                href={"/#contact"}
            >
                Contact
            </Button>
            {/* <Stack direction="row" justifyContent={"space-between"} sx={{
                pt: 4,
                maxWidth: 500
            }}>
                {
                    [1,2,3,4].map(nmbr => (
                <ButtonBase
                key={`count-${nmbr}`}
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <GroupOutlined
                        sx={{
                            width: 50,
                            height: 50,
                            color: "AppWorkspace"
                        }}
                    />
                    <Box>
                        <Typography fontWeight={500} fontSize={"1.5em"} align="center">165k+</Typography>
                        <Typography fontWeight={600}  fontSize={"1.8em"} color={"Highlight"} align="center">Clients</Typography>
                    </Box>
                </ButtonBase>
                    ))

                }
            </Stack> */}
            <Box sx={{ mt: 4, pt: 1 }}>
                <GroupAvatars />
            </Box>
        </>
    );
}

export default HeroTitle;