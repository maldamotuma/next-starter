import { Box, Button, Container, Stack } from "@mui/material";
import { FunctionComponent } from "react";
import Title from "../home/title";
import { Home } from "@mui/icons-material";
import Link from "next/link";
import ComboBox from "../nav/Search";

interface NotFoundProps {

}

const NotFound: FunctionComponent<NotFoundProps> = () => {
    return (
        <Container>
            <Stack sx={{ pt: 1, pb: 3 }}>
                <Title
                    primary="404 - Page Not Found"
                    secondary="The Page You are Looking for not found."
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <ComboBox />
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
                </Box>
            </Stack>
        </Container>
    );
}

export default NotFound;