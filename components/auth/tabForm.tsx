"use client"

import { FunctionComponent, SyntheticEvent, useState } from "react";
import SigninForm from "./signin/form";
import SignUpForm from "./signup/form";
import { indigo } from "@mui/material/colors";
import { Stack, Tabs, Tab, Box } from "@mui/material";

interface TabformProps {

}

const Tabform: FunctionComponent<TabformProps> = () => {
    const [tab, settab] = useState<"signin" | "signup">("signin");

    const handleTabChabge = (e: SyntheticEvent, nv: "signin" | "signup") => {
        settab(nv);
    }
    
    return (
        <Stack>
            <Tabs
                onChange={handleTabChabge}
                variant="fullWidth"
                value={tab}
                TabIndicatorProps={{
                    sx: {
                        bgcolor: indigo[900],
                        height: '100%',
                        zIndex: 1
                    }
                }}
                textColor="inherit"
            >
                <Tab label="SignIn" value={"signin"}
                    sx={{
                        "&.Mui-selected": {
                            color: "white",
                            zIndex: 2,
                        },
                        // position: "relative"
                    }}
                />
                <Tab label="SignUp" value={"signup"}
                    sx={{
                        "&.Mui-selected": {
                            color: "white",
                            zIndex: 2,
                        },
                        // position: "relative"
                    }}
                />
            </Tabs>
            <Box
                sx={{
                    p: 3
                }}
            >
                {
                    tab === "signin" ?
                        <SigninForm modal />
                        :
                        <SignUpForm modal />
                }
            </Box>
        </Stack>
    );
}

export default Tabform;