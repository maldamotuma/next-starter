"use client"
import { useInitialCall, useRemoteCall } from "@/hooks/remote-call";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { Checkbox, FormControlLabel, IconButton, Tooltip } from "@mui/material";
import { ChangeEvent, FunctionComponent, SyntheticEvent } from "react";
import { Blog } from "./types";
import { useAppSelector } from "@/redux/store";

interface FavoriteProps {
    blog: Blog;
}

const Favorite: FunctionComponent<FavoriteProps> = ({ blog }) => {
    const { axios, status } = useRemoteCall();
    const user = useAppSelector(state => state.auth.user);
    const { data: is_favorite, setData: setIs_favorite } = useInitialCall<boolean>(`/is-favorite?blog=${blog.id}`, false, {
        ky: "status"
    });


    const toggleFavorite = async (e: SyntheticEvent) => {
        if (user) {
            await axios.post(`/toggle-bookmark/${blog.id}`, {
                successCallBack() {
                    setIs_favorite(!is_favorite);
                },
            });
        }
    }

    return (
        <Tooltip
            disableInteractive
            title={user ? is_favorite ? "Remove from Favorite" : "Add to favorite" : "Login to add to favorite"}
        >
            <IconButton
                disabled={status === "pending"}
                onClick={toggleFavorite}
            >
                {
                    is_favorite ?
                        <Bookmark />
                        :
                        <BookmarkBorder />
                }
            </IconButton>
        </Tooltip>
    );
}

export default Favorite;