import CompanyCopy from "@/app/dashboard/company";
import { FunctionComponent } from "react";

interface CompanyProps {
    params: {
        slug: string;
    }
}

const Company: FunctionComponent<CompanyProps> = ({ params: { slug } }) => {
    return (<CompanyCopy slug={slug} />);
}

export default Company;