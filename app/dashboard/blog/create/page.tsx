import BlogForm from "@/components/blog/form";
import Title from "@/components/home/title";
import { Metadata } from "next";
import Script from "next/script";
import { FunctionComponent } from "react";

interface CreateBlogProps {

}
export const metada: Metadata = {
    title: "Craft Your Tech Story: Create a Blog at Tech-Scan",
    description: "Share your insights and expertise with the tech community. Create a blog at Tech-Scan and contribute to discussions on AI, full-stack development, React, Next.js, Laravel, Python, Machine Learning, and Deep Learning. Your voice, your story.",
    keywords: [
        "Tech-Scan",
        "Create Blog",
        "Tech Community",
        "AI",
        "Full-stack Development",
        "React",
        "Next.js",
        "Laravel",
        "Python",
        "Machine Learning",
        "Deep Learning"
    ]
};

const CreateBlog: FunctionComponent<CreateBlogProps> = () => {
    return (
        <>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Q7PPML4EDC" />
      <Script>
        {
          `
          window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-Q7PPML4EDC');
        `
        }
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