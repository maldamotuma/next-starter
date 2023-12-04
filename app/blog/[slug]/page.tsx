// "use client";

import BlogLoading from "@/components/blog/loading";
import BlogRead from "@/components/blog/read";
import { Blog } from "@/components/blog/types";
import NotFound from "@/components/error/notFound";
import Title from "@/components/home/title";
import Wrapper from "@/components/wrapper";
import axios from "@/config/axios";
import { Home, UndoOutlined } from "@mui/icons-material";
import { Box, Button, Container, Stack } from "@mui/material";
import Link from "next/link";
// import { useInitialCall } from "@/hooks/remote-call";
import { FunctionComponent } from "react";
import type { Metadata, ResolvingMetadata } from 'next'
import { server_url } from "@/config/variables";
import Script from "next/script";

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug

    // fetch data
    const res = await axios.get(`/blog?b=${slug}`);
    const { blog }: { blog: Blog } = res.data;

    if (blog) {
        // optionally access and extend (rather than replace) parent metadata
        const previousImages = (await parent).openGraph?.images || []

        return {
            title: blog.title,
            description: blog.article,
            keywords: blog.meta_keywords.split(','),
            authors: [{ name: blog.user ? `${blog.user.first_name} ${blog.user.last_name}` : `${blog.admin?.first_name || "Malda"} ${blog.admin?.last_name} || "Motuma"` }],
            openGraph: {
                images: [`${server_url}/blog/${blog.image}`, ...previousImages],
            },
        }
    } else {
        return {}
    }
}

interface BlgProps {
    params: {
        slug: string;
    }
}

const Blg: FunctionComponent<BlgProps> = async ({ params: { slug } }) => {
    // const { data: blog, status } = await useInitialCall<Blog & {
    //     related_blogs: Blog[]
    // } | null>(`/blog?b=${slug}`, null, {
    //     ky: "blog"
    // });
    const res = await axios.get(`/blog?b=${slug}`);

    return (
        <Wrapper>
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
            {
                res.data.success === 1 ?
                    <BlogRead
                        blog={res.data.blog}
                    />
                    :
                    <NotFound />
            }
        </Wrapper>
    );
}

export default Blg;