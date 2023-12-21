"use client";

import { server_url } from "@/config/variables";
import { useAppSelector } from "@/redux/store";
import { Alert, AlertTitle, Avatar, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface DashboardBannerProps {

}

const DashboardBanner: FunctionComponent<DashboardBannerProps> = () => {
    const user = useAppSelector(state => state.auth.user);

    return (
        <Alert
            severity="info"
            sx={{
                alignItems: "center",
                gap: 3,
                flexDirection: {
                    xs: "column",
                    sm: "row"
                }
            }}
            icon={<Avatar
                sx={{
                    width: 200,
                    height: 200
                }}
                alt={user?.first_name}
                src={`${server_url}/avatar/medium/${user?.profile_picture}`} />}
        >
            <AlertTitle
                sx={{
                    fontSize: "2em"
                }}
            >Welcome Back <strong>{user?.first_name} {user?.last_name[0]}.</strong></AlertTitle>
            <Typography sx={{ maxWidth: "sm" }}>
                Need assistance or just curious about something? Feel free to reach out. We&apos;re here to make your tech journey awesome!
            </Typography>
        </Alert>
    );
}

export default DashboardBanner;