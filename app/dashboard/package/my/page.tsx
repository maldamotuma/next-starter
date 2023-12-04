import { Alert } from "@mui/material";
import Script from "next/script";
import { FunctionComponent } from "react";

interface MyPackagesProps {

}

const MyPackages: FunctionComponent<MyPackagesProps> = () => {
    return (
        <>
            <Script id="my-packages-lnk" async src="https://www.googletagmanager.com/gtag/js?id=G-Q7PPML4EDC" />
            <Script id="my-packages">
                {
                    `
          window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-Q7PPML4EDC');
        `
                }
            </Script>
            <Alert severity="info">No Packages!</Alert>
        </>
    );
}

export default MyPackages;