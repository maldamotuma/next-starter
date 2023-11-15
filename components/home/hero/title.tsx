"use client"

import { ArrowForwardIosOutlined, ArrowForwardOutlined, GroupOutlined } from "@mui/icons-material";
import { Button, ButtonBase, Chip, Stack, Typography, Box } from "@mui/material";
import { FunctionComponent } from "react";

interface HeroTitleProps {

}

const HeroTitle: FunctionComponent<HeroTitleProps> = () => {
    return (
        <>
            <Chip
                label="Trahsport Your Goods Around"
                color="primary"
                variant="outlined"
                deleteIcon={<ArrowForwardOutlined />}
                onDelete={() => { }}
            />
            <Typography variant="h1" component="h1" fontWeight={800} fontSize={"5em"} sx={{ mt: 1, mb: 3 }}>
                Trahsport Your Goods Around the World.
            </Typography>
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
            <Stack direction="row" spacing={2}>
                <ButtonBase
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <GroupOutlined
                        sx={{
                            width: 150,
                            height: 150
                        }}
                    />
                    <Box>
                        <Typography fontWeight={700}>165k+</Typography>
                        <Typography fontWeight={700}>Clients</Typography>
                    </Box>
                </ButtonBase>
                <Chip
                    label="Users"
                    icon={<GroupOutlined />}
                />
                <Chip
                    label="Users"
                    icon={<GroupOutlined />}
                />
                <Chip
                    label="Users"
                    icon={<GroupOutlined />}
                />
                <Chip
                    label="Users"
                    icon={<GroupOutlined />}
                />
            </Stack>
        </>
    );
}

export default HeroTitle;