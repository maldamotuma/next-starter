import Contacts from "@/components/contact";
import Title from "@/components/home/title";
import { FunctionComponent } from "react";

interface ContactProps {

}

const Contact: FunctionComponent<ContactProps> = () => {
    return (
        <>
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