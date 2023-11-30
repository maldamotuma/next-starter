"use client";
import { FunctionComponent } from "react";
import { Blog } from "../blog/types";
import { useInitialCall } from "@/hooks/remote-call";
import { Stack } from "@mui/material";
import BlogsCrousel from "./BlogsCrousel";

interface DashboardContentProps {

}
type DashContent = {
    favorites: Blog[];
    blogs: Blog[];
}
const DashboardContent: FunctionComponent<DashboardContentProps> = () => {
    const { data: dash, status } = useInitialCall<DashContent>("/dashboard", {
        blogs: [],
        favorites: []
    }, {
        ky: "dash"
    });

    if (status === "pending") {
        return <>Loading...</>
    }

    return (
        <Stack spacing={6} sx={{mt: 6}}>
            <BlogsCrousel
                title={{
                    primary: "Favorites",
                    secondary: "Some of your bookmarked blogs"
                }}
                blogs={dash.favorites}
            />
            <BlogsCrousel
                title={{
                    primary: "Blogs",
                    secondary: "Some of recentely Created blogs"
                }}
                blogs={dash.blogs}
            />
        </Stack>
    );
}

export default DashboardContent;