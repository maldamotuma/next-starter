import CompanyCopy from "@/components/company";
import axios from "@/config/axios";
import { server_url } from "@/config/variables";
import { Metadata, ResolvingMetadata } from "next";
import Script from "next/script";
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
    return (
    <>
    <Script id="company-lnk" async src="https://www.googletagmanager.com/gtag/js?id=G-Q7PPML4EDC" />
      <Script id="company">
        {
          `
          window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-Q7PPML4EDC');
        `
        }
      </Script>
    <CompanyCopy slug={slug} />
    </>
    );
}

export default Company;