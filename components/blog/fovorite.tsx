"use client"
import { useInitialCall, useRemoteCall } from "@/hooks/remote-call";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { ChangeEvent, FunctionComponent } from "react";
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


    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (user) {
            await axios.post(`/toggle-bookmark/${blog.id}`, {
                successCallBack() {
                    setIs_favorite(!is_favorite);
                },
            });
        }
    }

    return (
        <>

            <FormControlLabel
                disabled={status === "pending"}
                checked={is_favorite}
                control={<Checkbox
                    onChange={handleChange}
                    sx={{
                        "& .MuiSvgIcon-root": {
                            fontSize: "30px !important"
                        }
                    }}
                    icon={<BookmarkBorder />}
                    checkedIcon={<Bookmark />}
                    checked={is_favorite} />}
                label={user ? is_favorite ? "Remove from Favorite" : "Add to favorite" : "Login to add to favorite"}
            />
        </>
    );
}

export default Favorite;