import DashboardContent from "@/components/dashboard/Dash-content";
import DashboardBanner from "@/components/dashboard/welcome-banner";
import { Box } from "@mui/material";
import Script from "next/script";
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
            <Script id="dashboard-lnk" async src="https://www.googletagmanager.com/gtag/js?id=G-Q7PPML4EDC" />
      <Script id="dashboard">
        {
          `
          window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-Q7PPML4EDC');
        `
        }
      </Script>
            <DashboardBanner />
            <DashboardContent />
        </Box>
    );
}

export default Dahboard;