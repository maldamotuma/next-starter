import { Box, Container, Stack } from "@mui/material";
import { FunctionComponent } from "react";
import ContentCopy from "./copy";
import ContentIMage from "./image";

interface ContentProps {

}

const Content: FunctionComponent<ContentProps> = () => {
    return (
        <Container maxWidth="xl">
            <Stack direction={{
                xs: "column",
                md: "row-reverse"
            }} alignItems="center" gap={10}>
                <Box
                    sx={{
                        flex: 1
                    }}
                >
                    <ContentCopy />
                </Box>
                <Box
                    sx={{
                        flex: 1
                    }}
                >
                    <ContentIMage />
                </Box>
            </Stack>
        </Container>
    );
}

export default Content;