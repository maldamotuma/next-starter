import Contacts from "@/components/contact";
import Title from "@/components/home/title";
import Script from "next/script";
import { FunctionComponent } from "react";

interface ContactProps {

}

const Contact: FunctionComponent<ContactProps> = () => {
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
                primary={"Filled Contact Forms"}
                primaryProps={{
                    align: "left",
                    fontSize: "1.2em",
                    fontWeight: 600
                }}
            />
            <Contacts />
        </>
    );
}

export default Contact;