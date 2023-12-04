import BlogCard from "@/components/blog/blog-card";
import { Blog } from "@/components/blog/types";
import Title from "@/components/home/title";
import Wrapper from "@/components/wrapper";
import { useInitialCall } from "@/hooks/remote-call";
import { Alert, Container, Grid, Skeleton } from "@mui/material";
import { FunctionComponent } from "react";
import { Metadata } from "next";
import BlogBookmarks from "@/components/blog/bookmarks";

export const metadata: Metadata = {
    title: "Your Bookmarked Blogs at Tech-Scan: Personalized Insights Always at Your Fingertips",
    description: "Explore your curated list of bookmarked blogs at Tech-Scan. Access personalized insights on AI, full-stack development, React, Next.js, Laravel, Python, Machine Learning, and Deep Learning. Your tailored tech journey, always within reach.",
    keywords: [
        "Tech-Scan",
        "Bookmarked Blogs",
        "Saved Articles",
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

interface BoolmarksProps {

}

const Boolmarks: FunctionComponent<BoolmarksProps> = () => {

    return (
        <Wrapper>
            <Container maxWidth="xl">
                <Title
                    primary={"Blogs"}
                    secondary={"Bookmarked Blogs"}
                />
                <BlogBookmarks />
            </Container>
        </Wrapper>
    );
}

export default Boolmarks;