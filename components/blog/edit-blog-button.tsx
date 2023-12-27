"use client"

import { useAppSelector } from "@/redux/store";
import { AppRegistrationOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";

interface EditBlogButtonProps {
    slug: string;
    author_id?: number;
}

const EditBlogButton: FunctionComponent<EditBlogButtonProps> = ({ slug, author_id }) => {
    const user = useAppSelector(state => state.auth.user);
    if (user?.id === author_id) return <IconButton color={"info"} component={Link} href={`/dashboard/blog/edit?b=${slug}`}><AppRegistrationOutlined /></IconButton>
    return <></>
}

export default EditBlogButton;