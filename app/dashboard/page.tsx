import DashboardContent from "@/components/dashboard/Dash-content";
import DashboardBanner from "@/components/dashboard/welcome-banner";
import { Box } from "@mui/material";
import { FunctionComponent } from "react";

interface DahboardProps {
    // user: { name: { sir: string } }
}

const Dahboard: FunctionComponent<DahboardProps> = (
    // { user }
) => {
    return (
        <Box>
            {/*  Uncomment To see how it responds to errors */}
            {/* {
               user.name.sir
            } */}
            <DashboardBanner />
            <DashboardContent />
        </Box>
    );
}

export default Dahboard;