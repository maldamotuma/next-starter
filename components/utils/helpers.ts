import { SxProps } from "@mui/material"

export const maxLine = (ln: number): SxProps => {
    return {
        display: "-webkit-box",
        WebkitLineClamp: ln,
        WebkitBoxOrient: "vertical",
        overflow: "hidden"
    }
}