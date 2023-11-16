"use client"

import BasicProfile from "@/components/profile/basic";
import { server_url } from "@/config/variables";
import { useAppSelector } from "@/redux/store";
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface ProfileProps {

}

const Profile: FunctionComponent<ProfileProps> = () => {
    const { user } = useAppSelector(state => state.auth);

    return (
        <Card
            variant={"outlined"}
            sx={{
                border: 0,
                borderRadius: 0,
                maxWidth: "md"
            }}
        >
            <CardMedia
                component={"img"}
                src={"/profile-cover.jpg"}
                sx={{
                    maxHeight: 250,
                    borderRadius: 3
                }}
            />
            <CardHeader
                sx={{
                    pt: 0,
                    alignItems: "start"
                }}
                avatar={<Avatar
                    sx={{
                        width: "130px",
                        height: "130px",
                        mt: "-65px",
                        border: 10,
                        borderColor: "background.paper"
                    }}
                    alt={`${user?.first_name} ${user?.last_name}`} src={`${server_url}/avatar/medium/${user?.profile_picture}`} />}
                title={`${user?.first_name} ${user?.last_name}`}
                titleTypographyProps={{
                    fontSize: "1.5em",
                    fontWeight: 600
                }}
            />
            <CardContent sx={{maxWidth: "md"}}>
                <BasicProfile />
            </CardContent>
        </Card>
    );
}

export default Profile;