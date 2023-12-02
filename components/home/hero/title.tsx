"use client"

import { ArrowForwardIosOutlined, ArrowForwardOutlined, GroupOutlined, MailOutline, Person2 } from "@mui/icons-material";
import { Button, ButtonBase, Chip, Stack, Typography, Box, TextField, FormHelperText } from "@mui/material";
import { FunctionComponent } from "react";
import GroupAvatars from "./avatars";
import { useEmailSubscribe } from "@/hooks/subscribecta";
import { LoadingButton } from "@mui/lab";

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
                label="Trahsport Your Goods Around"
                color="primary"
                variant="outlined"
                deleteIcon={<ArrowForwardOutlined />}
                onDelete={() => { }}
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
                    }
                }}
            >
                Trahsport Your Goods Around the World.
            </Typography>
            <Typography color={"GrayText"}
                sx={{
                    textAlign: {
                        xs: "center",
                        md: "left"
                    }
                }}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea est reiciendis placeat amet ad iste pariatur, qui voluptas possimus alias earum provident.
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
                    >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, facilis? Facere eveniet.</FormHelperText>
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
            >
                Secondary
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