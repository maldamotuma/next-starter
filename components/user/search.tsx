import { statusTypes } from "@/config/types";
import { useRemoteCall } from "@/hooks/remote-call"
import { Search } from "@mui/icons-material";
import { Alert, Button, CardContent, CardHeader, CircularProgress, List, ListItemButton, MenuItem, Paper, Select, TextField, outlinedInputClasses, selectClasses } from "@mui/material";
import { ChangeEvent, ReactNode, useCallback, useRef, useState } from "react";

interface SearchProps<T> {
    search(q: string): void;
    renderInput: ReactNode;
    renderResult: ReactNode;
}
type EmptyArray = {
    id: number | string;
};

export const useSearch = <T extends EmptyArray>(url: string, options: {
    searchby?: { [key: string]: string },
    rl(item: T): ReactNode
}): SearchProps<T> => {
    const { axios, status } = useRemoteCall();
    const [results, setResults] = useState<T[]>([]);
    const byRef = useRef<HTMLInputElement>();

    const search = useCallback(
        async (q: string) => {
            const res = await axios.get(`${url}?by=${byRef.current?.value || ""}&q=${q}`);
            if (res) setResults(res);
        },
        [],
    )

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value;
        if (q) {
            search(q);
        } else {
            setResults([]);
        }
    }


    const renderInput = (
        <TextField
            fullWidth
            placeholder="search here..."
            onChange={handleChange}
            InputProps={{
                sx: {
                    ...(options?.searchby && {
                        pl: "0 !important"
                    }),
                    alignItems: "center"
                },
                ...(options?.searchby && {
                    startAdornment: <Select
                        inputRef={byRef}
                        // onChange={(e) => { byRef.current = e.target.value }}
                        sx={{
                            width: 150,
                            borderColor: "transparent !important",
                            boxShadow: "none !important",
                            [`& .${outlinedInputClasses.notchedOutline}`]: {
                                border: "0 !important",
                                outline: "0 !important"
                            }
                        }}
                        displayEmpty
                    >
                        <MenuItem disabled>
                            <em>Search By</em>
                        </MenuItem>
                        {
                            Object.keys(options.searchby).map(sb => (
                                <MenuItem
                                    key={"search-by-" + sb}
                                    value={sb}
                                >{options?.searchby && options?.searchby[sb]}</MenuItem>
                            ))
                        }
                    </Select>
                }),
                ...(status === "pending" && {
                    endAdornment: <div><CircularProgress color="inherit" size={25} /></div>
                })
            }}
        />
    )

    const renderResult = (
        <Paper
            sx={{
                mt: 2
            }}
        >
            <CardHeader
                title={"Search Result"}
                titleTypographyProps={{
                    color: "text.secondary"
                }}
            />
            <CardContent sx={{ pt: 0 }}>
                {
                    results.length ?
                        <List>
                            {
                                results.map(rslt => options.rl(rslt))
                            }
                        </List>
                        :
                        <Alert severity="info">No Search Result</Alert>
                }
            </CardContent>
        </Paper>
    )

    return {
        search,
        renderInput,
        renderResult
    }
}