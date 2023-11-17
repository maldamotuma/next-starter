import { CheckCircle, Circle, Help } from "@mui/icons-material";
import { Box, Button, Chip, List, ListItem, ListItemIcon, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Title from "../home/title";

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
                    primary={"Introduction to the best Port Trader!"}
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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione optio cumque veniam! Officiis quae possimus dolore! Sit repudiandae quo error est commodi mollitia sequi autem, sed dignissimos. Pariatur, ab suscipit!
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
                        ['Lorem ipsum, dolor sit amet consectetur', 'consectetur adipisicing elit. Ratione optio', 'mollitia sequi autem, sed dignissimos.', 'Sit repudiandae quo error est commodidfggf', 'sequi autem, sed dignissimos. Pariaturxccz!'].map(lst => (
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
                >
                    More About Us
                </Button>
            </Box>
        </Stack>
    );
}

export default ContentCopy;