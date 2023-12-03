import { CheckCircle, Circle, Help } from "@mui/icons-material";
import { Box, Button, Chip, List, ListItem, ListItemIcon, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Title from "../home/title";
import Link from "next/link";

interface ContentCopyProps {

}

const ContentCopy: FunctionComponent<ContentCopyProps> = () => {
    return (
        <Stack>
            <Box>
                <Chip
                    label={"about us"}
                    icon={<Help />}
                    color="info"
                />
                <Title
                    primary={"AI and Full-stack Development Blogs, Get Free Coding Help!"}
                    primaryProps={{
                        align: "left"
                    }}
                    secondaryProps={{
                        sx: {
                            mb: 0,
                            pb: 0
                        }
                    }}
                />
            </Box>
            <Typography color="text.secondary" sx={{ my: 1 }}>
                Exploring AI and Full-stack Development Blogs, Plus Your Ticket to Free Personalized Coding Assistance!. We're not just solving errors – we're building a collaborative community
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    // justifyContent: "space-between"
                }}
            >
                <List>
                    {
                        [
                            'Free Personalized Assistance',
                            'Blogs on Artificial Intelligence',
                            'Consulting Services',
                            'Website Development Services',
                            'AI Development Services',
                            'Blogs on Full-stack Development.'
                        ].map(lst => (
                            <ListItem
                                key={lst}
                                sx={{
                                    color: "info.dark"
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle
                                        sx={{
                                            color: "info.dark"
                                        }}
                                    />
                                </ListItemIcon>
                                {
                                    lst
                                }
                            </ListItem>
                        ))
                    }
                </List>
                <Box
                    sx={{
                        border: 5,
                        borderColor: "divider",
                        px: 3,
                        py: 1,
                        display: {
                            xs: "none",
                            lg: "inline-block"
                        },
                        borderRadius: 7
                    }}
                >
                    <Typography
                        align={"center"}
                        fontSize={"2.5em"}
                        fontWeight={900}
                        color="secondary.dark"
                    >24</Typography>
                    <Typography
                        align={"center"}
                        fontWeight={900}
                        fontSize={"1.5em"}
                        color="text.secondary"
                    >HOURS</Typography>
                    <Typography
                        align={"center"}
                        fontWeight={900}
                        fontSize={"1.2em"}
                        color="text.secondary"
                    >SUPPORT</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    pt: 4
                }}
            >
                <Button
                    variant="contained"
                    component={Link}
                    href={"/company/about-us"}
                >
                    More About Us
                </Button>
            </Box>
        </Stack>
    );
}

export default ContentCopy;