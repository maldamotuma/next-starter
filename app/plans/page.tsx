import Pricing from "@/components/home/priving";
import Wrapper from "@/components/wrapper";
import { Metadata } from "next";
import Script from "next/script";
import { FunctionComponent } from "react";

interface PlansProps {

}

export const metadata: Metadata = {
    title: "Explore Tech-Scan Membership Plans: Choose the Right Path for Your Tech Journey",
    description: "Discover the variety of membership plans at Tech-Scan. From free access to premium offerings, explore plans tailored for AI, full-stack development, React, Next.js, Laravel, Python, Machine Learning, and Deep Learning enthusiasts. Elevate your tech journey with the perfect membership.",
    keywords: [
        "Tech-Scan",
        "Membership Plans",
        "Pricing",
        "Tech Journey",
        "AI",
        "Full-stack Development",
        "React",
        "Next.js",
        "Laravel",
        "Python",
        "Machine Learning",
        "Deep Learning",
        "Tech Community"
    ]
}

const Plans: FunctionComponent<PlansProps> = () => {
    return (
        <Wrapper>
            <Script id="plans-lnk" async src="https://www.googletagmanager.com/gtag/js?id=G-Q7PPML4EDC" />
            <Script id="plans">
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
        </Wrapper>
    );
}

export default Plans;