import BlogForm from "@/components/blog/form";
import Title from "@/components/home/title";
import Script from "next/script";
import { FunctionComponent } from "react";

interface CreateBlogProps {

}

const CreateBlog: FunctionComponent<CreateBlogProps> = () => {
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
                primary={"Create Blog"}
                secondary={"Share Knowledge - Sharing is Caring"}
            />
            <BlogForm />
        </>
    );
}

export default CreateBlog;