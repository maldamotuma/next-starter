import BlogList from "@/components/blog/list";
import { Article } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import Script from "next/script";
import { FunctionComponent } from "react";

interface BlogsProps {

}

const Blogs: FunctionComponent<BlogsProps> = () => {
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
            <Button
                sx={{
                    mb: 2
                }}
                startIcon={<Article />}
                component={Link} href="/dashboard/blog/create">Create Blog</Button>
            <BlogList />
        </>
    );
}

export default Blogs;