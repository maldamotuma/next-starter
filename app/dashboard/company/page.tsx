import CompanyCopies from "@/components/company/list";
import Script from "next/script";
import { FunctionComponent } from "react";

interface CompanyProps {

}

const Company: FunctionComponent<CompanyProps> = () => {
    return (
        <>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YRJ9KDZNZ0" />
            <Script id={"google-analytics"}>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-YRJ9KDZNZ0');
                `}
            </Script>
            <CompanyCopies />
        </>
    );
}

export default Company;