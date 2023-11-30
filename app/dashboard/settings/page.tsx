"use client"

import SignUpForm from "@/components/auth/signup/form";
import BasicEdit from "@/components/profile-edit/basic";
import ChangePassword from "@/components/profile-edit/change-password";
import { server_url } from "@/config/variables";
import { useAppSelector } from "@/redux/store";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Tab, Tabs } from "@mui/material";
import moment from "moment";
import { FunctionComponent, useState } from "react";
import EditPP from "./edit-pp";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

const settingTab = {
    profile: <BasicEdit />,
    security: <ChangePassword />
}

interface SettingsProps {

}

const Settings: FunctionComponent<SettingsProps> = () => {
    const { user } = useAppSelector(state => state.auth);
    const sp = useSearchParams();
    const [setting, setSetting] = useState<"profile" | "security">(sp.get("tab") === "change-password" ? "security" : "profile");


    return (
        <Box
            sx={{
                maxWidth: "md"
            }}
        >
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YRJ9KDZNZ0" />
            <Script id={"google-analytics"}>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-YRJ9KDZNZ0');
                `}
            </Script>
            <CardHeader
                subheader={<>{`Joined ${moment(user?.created_at).fromNow()}`}<br /><EditPP /></>}
                avatar={<Avatar
                    sx={{
                        width: "130px",
                        height: "130px",
                    }}
                    alt={`${user?.first_name} ${user?.last_name}`} src={`${server_url}/avatar/medium/${user?.profile_picture}`} />}
                title={`${user?.first_name} ${user?.last_name}`}
                titleTypographyProps={{
                    fontSize: "1.2em",
                }}
            />
            <Tabs
                value={setting}
                onChange={(e, t) => setSetting(t)}
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    my: 3,
                }}
            >
                <Tab label="Profile" value={"profile"} />
                <Tab label="Security" value={"security"} />
            </Tabs>

            {settingTab[setting]}
        </Box>
    );
}

export default Settings;