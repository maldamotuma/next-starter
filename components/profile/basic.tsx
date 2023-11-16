"use client";

import { useAppSelector } from "@/redux/store";
import { Person4 } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";

interface BasicProfileProps {

}

const BasicProfile: FunctionComponent<BasicProfileProps> = () => {
    const { user } = useAppSelector(state => state.auth);

    return (
        <Grid container sx={{ px: 2 }}>
            <Grid item xs={12} md={6}
                sx={{
                    border: 1,
                    p: 2,
                    borderColor: "divider",
                    borderBottom: 0
                }}
            >
                <Typography fontWeight={500}>First Name</Typography>
            </Grid>
            <Grid item xs={12} md={6}
                sx={{
                    border: 1,
                    p: 2,
                    borderColor: "divider",
                    borderLeft: 0,
                    borderBottom: 0
                }}
            >
                <Typography>{user?.first_name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}
                sx={{
                    border: 1,
                    p: 2,
                    borderColor: "divider",
                    borderBottom: 0
                }}
            >

                <Typography fontWeight={500}>Last Name</Typography>
            </Grid>
            <Grid item xs={12} md={6}
                sx={{
                    border: 1,
                    p: 2,
                    borderColor: "divider",
                    borderLeft: 0,
                    borderBottom: 0
                }}
            >

                <Typography>{user?.last_name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}
                sx={{
                    border: 1,
                    p: 2,
                    borderColor: "divider",
                    borderBottom: 0
                }}>

                <Typography fontWeight={500}>Username</Typography>
            </Grid>
            <Grid item xs={12} md={6}
                sx={{
                    border: 1,
                    p: 2,
                    borderColor: "divider",
                    borderLeft: 0,
                    borderBottom: 0
                }}
            >

                <Typography>{user?.username}</Typography>
            </Grid>
            <Grid item xs={12} md={6}
                sx={{
                    border: 1,
                    p: 2,
                    borderColor: "divider",
                    borderBottom: 0
                }}
            >

                <Typography fontWeight={500}>Email</Typography>
            </Grid>
            <Grid item xs={12} md={6}
                sx={{
                    border: 1,
                    p: 2,
                    borderColor: "divider",
                    borderLeft: 0,
                    borderBottom: 0
                }}
            >

                <Typography>{user?.email}</Typography>
            </Grid>
            <Grid item xs={12} md={6}
                sx={{
                    border: 1,
                    p: 2,
                    borderColor: "divider",
                    borderBottom: 0
                }}
            >

                <Typography fontWeight={500}>Phone</Typography>
            </Grid>
            <Grid item xs={12} md={6}
                sx={{
                    border: 1,
                    p: 2,
                    borderColor: "divider",
                    borderLeft: 0,
                    borderBottom: 0,
                }}
            >

                <Typography>{user?.phone}</Typography>
            </Grid>
            <Grid item xs={12} md={6}
                sx={{
                    border: 1,
                    p: 2,
                    borderColor: "divider",
                }}
            >

                <Typography fontWeight={500}>Gender</Typography>
            </Grid>
            <Grid item xs={12} md={6}
                sx={{
                    border: 1,
                    p: 2,
                    borderColor: "divider",
                    borderLeft: 0
                }}
            >

                <Typography>{user?.gender}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ pt: 5 }}>
                <Button
                    component={Link}
                    href={'/dashboard/settings'}
                    variant={"contained"}
                    startIcon={<Person4 />}>Edit Profile</Button>
            </Grid>
        </Grid>
    );
}

export default BasicProfile;