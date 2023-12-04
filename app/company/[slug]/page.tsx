import CompanyCopy from "@/components/company";
import axios from "@/config/axios";
import { server_url } from "@/config/variables";
import { Metadata, ResolvingMetadata } from "next";
import { FunctionComponent } from "react";

interface CompanyProps {
    params: {
        slug: string;
    }
}

export async function generateMetadata(
    { params }: CompanyProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug

    // fetch data
    const res = await axios.get(`/company-copy/${slug}`);
    const { copy }: {copy: { title: string, image: string }} = res.data;

    if (copy) {
        // optionally access and extend (rather than replace) parent metadata
        const previousImages = (await parent).openGraph?.images || []

        return {
            title: copy.title,
            openGraph: {
                images: [`${server_url}/blog/${copy.image}`, ...previousImages],
            },
        }
    } else {
        return {}
    }
}

const Company: FunctionComponent<CompanyProps> = ({ params: { slug } }) => {
    return (<CompanyCopy slug={slug} />);
}

export default Company;