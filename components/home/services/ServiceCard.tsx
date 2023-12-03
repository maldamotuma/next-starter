import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";
import { blueGrey, indigo } from "@mui/material/colors"

interface ServiceCardProps {
    service: {
        title: string;
        copy: string;
        image: string;
    },
    active: boolean;
}

const ServiceCard: FunctionComponent<ServiceCardProps> = ({ service: { title, copy, image }, active }) => {
    return (
        <Box
            sx={{
                pt: "40px",
                pl: "40px"
            }}
        >
            <Card
                variant={"outlined"}
                sx={{
                    p: "10px",
                    borderRadius: "20px",
                    transition: ".2s all linear",
                    overflow: "visible",
                    ...(active && {
                        bgcolor: indigo[900],
                        color: "#ffffff"
                    }),
                    "&:hover": {
                        bgcolor: blueGrey[900],
                        color: "#ffffff"
                    }
                }}
            >
                <CardHeader
                    title={title}
                    avatar={
                        <Box
                            sx={{
                                borderRadius: "25px",
                                mt: "-50px",
                                ml: "-50px",
                                p: "10px",
                                bgcolor: "background.paper"
                            }}
                        >
                            <Box
                                component={"img"}
                                src={image}
                                alt=""
                                width={"100px"}
                                height={"100px"}
                                sx={{
                                    borderRadius: "15px",
                                    objectFit: "cover"
                                }}
                            />
                        </Box>
                    }
                    titleTypographyProps={{
                        fontWeight: 600,
                        fontSize: "1.1em"
                    }}
                />
                <CardContent sx={{ py: 0 }}>
                    <Typography>
                        {
                            copy
                        }
                    </Typography>
                </CardContent>
                {/* <CardActions>
                <Button
                    endIcon={<ArrowForward />}
                    component={Link}
                    href={"/company/rules-and-regulations"}
                >
                    Lear More
                </Button>
            </CardActions> */}
            </Card>
        </Box>
    );
}

export default ServiceCard;