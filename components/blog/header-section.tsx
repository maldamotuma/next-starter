import { blue, blueGrey } from "@mui/material/colors";
import { FunctionComponent } from "react";
import { Blog } from "./types";
import styles from "./styles.module.css";
import { server_url } from "@/config/variables";
import { maxLine } from "../utils/helpers";
import AuthorAvatar from "./AutherAvatar";
import { HeaderChip, ImageWrapper } from "./style-wrapper";
import blogStyles from "./styles/blog.module.scss";
import Link from "next/link";


interface BlogHeaderProps {
    blog: Blog
}

const BlogHeader: FunctionComponent<BlogHeaderProps> = ({ blog }) => {
    return (
        <div
            className={`${styles.container} ${blogStyles['header-wrapper']}`}
        >
            <div
                className={`${styles.container} ${blogStyles['title-wrapper']}`}
            >
                <HeaderChip blog={blog} />
                <h1
                    style={{
                        // @ts-ignore
                        color: "#ffffff",
                        ...(maxLine(2)),
                        margin: 0,
                        padding: 0
                    }}
                    className={blogStyles['blog-header-title']}
                >{blog.title}</h1>
                <p
                    style={{
                        // @ts-ignore
                        color: blue[100],
                        ...(maxLine(2)),
                        margin: 0,
                        fontSize: "14px"
                    }}
                >
                    {
                        blog.article
                    }
                </p>
                <div
                    className={`${styles.container} ${blogStyles['author-wrapper']}`}
                >
                    <AuthorAvatar blog={blog} />
                </div>
            </div>
            <div
                className={blogStyles['hero-img-wrapper']}
            >
                <img
                    alt={blog.title}
                    src={`${server_url}/blog/${blog.image}?width=750`}
                    width={"750px"}
                    height={"450px"}
                    style={{
                        width: "100%",
                        maxWidth: "800px",
                        height: "auto",
                        aspectRatio: "5/3",
                        display: "block",
                        margin: "auto",
                        objectFit: "cover",
                        position: "relative",
                        zIndex: 1,
                        borderRadius: "20px",
                    }}
                />
            </div>
        </div>
    );
}

export default BlogHeader;