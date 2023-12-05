import EmailLists from "@/components/contact/email-lists";
import Title from "@/components/home/title";
import Script from "next/script";
import { FunctionComponent } from "react";

interface EmailsProps {

}

const Emails: FunctionComponent<EmailsProps> = () => {
    return (
        <>
        <Script id={"ggl-lnk"} async src="https://www.googletagmanager.com/gtag/js?id=G-YRJ9KDZNZ0" />
            <Script id={"google-analytics"}>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-YRJ9KDZNZ0');
                `}
            </Script>
            <Title
                primary={"Email Lists"}
                primaryProps={{
                    align: "left",
                    fontSize: "1.2em",
                    fontWeight: 600
                }}
            />
            <EmailLists />
        </>
    );
}

export default Emails;