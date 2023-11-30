"use client"

import Footers from "@/components/footers";
import ResponsiveAppBar from "@/components/home/nav";
import Title from "@/components/home/title";
import { Home, UndoOutlined } from "@mui/icons-material";
import { Box, Button, Container, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

interface NotFoundProps {

}

const NotFound: FunctionComponent<NotFoundProps> = () => {
    const router = useRouter();

    return (
        <>
            <ResponsiveAppBar
                handleOpen={() => { }}
                open={false}
            />
            <Container>
                <Stack sx={{ pt: 1, pb: 3 }}>
                    <Title
                        primary="404 - Page Not Found"
                        secondary="The Page You are Looking for not found."
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Button
                            variant={"contained"}
                            sx={{
                                mr: 2
                            }}
                            startIcon={<Home />}
                            component={Link}
                            href={"/"}
                        >
                            Home
                        </Button>
                        <Button
                            variant={"outlined"}
                            startIcon={<UndoOutlined />}
                            onClick={router.back}
                        >
                            Back
                        </Button>
                    </Box>
                </Stack>
            </Container>
            <Footers />
        </>
    );
}

export default NotFound;