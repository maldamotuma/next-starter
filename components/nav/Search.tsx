"use client";

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import { useRemoteCall } from '@/hooks/remote-call';
import { Blog } from '../blog/types';
import { CircularProgress, ListItemText, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function SearchBlog() {
    const [blogs, setBlogs] = React.useState<Blog[]>([]);
    const { axios, status } = useRemoteCall();
    const router = useRouter();


    const handleQueryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 2) {
            setBlogs([]);
            const res = await axios.get(`/blogs?q=${e.target.value}`, {
                ky: 'blogs'
            });
            if (res) setBlogs(res);
        }
    }

    const handleChange = (_event: React.SyntheticEvent, value: Blog | null) => {
        if(value) router.push(`/dashboard/blog/read?b=${value.slug}`);
    }

    return (
        <Autocomplete
            disablePortal
            id="blogs-search-appbar"
            options={blogs}
            sx={{
                width: {
                    xs: "100%",
                    sm: 300,
                    lg: 450
                },
            }}
            onChange={handleChange}
            autoHighlight
            filterOptions={(x) => x}
            renderOption={(props, option) => (
                <MenuItem component="li" {...props}>
                    <ListItemText
                        primary={option.title}
                        primaryTypographyProps={{
                            noWrap: true
                        }}
                    />
                </MenuItem>
            )}
            loading={status === "pending"}
            renderInput={(params) => <TextField
                {...params}
                placeholder="search blog..."
                size={"small"}
                onChange={handleQueryChange}
            />}
            getOptionLabel={option => option.title}
        />
    );
}
