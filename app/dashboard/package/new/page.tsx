import Pricing from "@/components/home/priving";
import Script from "next/script";
import { FunctionComponent } from "react";

interface NewPackageProps {

}

const NewPackage: FunctionComponent<NewPackageProps> = () => {
    return (
        <>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Q7PPML4EDC" />
            <Script>
                {
                    `
          window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-Q7PPML4EDC');
        `
                }
            </Script>
            <Pricing />
        </>
    );
}

export default NewPackage;