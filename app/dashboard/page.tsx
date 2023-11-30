import DashboardContent from "@/components/dashboard/Dash-content";
import DashboardBanner from "@/components/dashboard/welcome-banner";
import { Box } from "@mui/material";
import Script from "next/script";
import { FunctionComponent } from "react";

interface DahboardProps {

}

const Dahboard: FunctionComponent<DahboardProps> = () => {
    return (
        <Box>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YRJ9KDZNZ0" />
            <Script id={"google-analytics"}>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-YRJ9KDZNZ0');
                `}
            </Script>
            <DashboardBanner />
            <DashboardContent />
        </Box>
    );
}

export default Dahboard;