"use client"

import { Card, CardContent, Typography, CardHeader, Avatar, Rating, Box } from "@mui/material";
import { FunctionComponent } from "react";

interface TestimonyProps {

}

const Testimony: FunctionComponent<TestimonyProps> = () => {
    return (
        <Card
            variant={'outlined'}
            sx={{
                position: "relative"
            }}
        >
            <Box
                component={"img"}
                src={"/cotation.png"}
                sx={{
                    width: 75,
                    position: "absolute",
                    top: 10,
                    left: 10,
                    opacity: theme => theme.palette.mode === "light" ? .1 : .75
                }}
            />
            <CardContent
                sx={{
                    position: "relative",
                    zIndex: 1
                }}
            >
                <Typography fontWeight={600}>
                    What a generation is this dude?
                </Typography>
                <Rating sx={{ mb: 1.5 }} value={5} readOnly />
                <Typography color="text.secondary">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius ad fuga, fugit dolore, perspiciatis repellat doloremque ab et accusantium debitis explicabo provident laborum culpa ipsam dolores ullam aperiam similique quod?
                </Typography>
            </CardContent>
            <CardHeader
                avatar={
                    <Avatar src={"https://images.pexels.com/photos/5393594/pexels-photo-5393594.jpeg?auto=compress&cs=tinysrgb&w=600"} />
                }
                title="Malda Motuma"
                subheader="Web apps Expert"
            />
        </Card>
    );
}

export default Testimony;