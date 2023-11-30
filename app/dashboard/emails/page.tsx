import EmailLists from "@/components/contact/email-lists";
import Title from "@/components/home/title";
import { FunctionComponent } from "react";

interface EmailsProps {

}

const Emails: FunctionComponent<EmailsProps> = () => {
    return (
        <>
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