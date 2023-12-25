import { FunctionComponent } from "react";
import { Blog } from "./types";
import TableOfContent from "./TableOfContent";
import styles from "./styles.module.css";
import Progresss from "@/utils/progresss";
import ShareButtons from "./share-icons";
import BlogHeader from "./header-section";
// import  from "./related-blogs";
import SubscribeCta from "../home/call-to-actions/SubscribeCard";
import { blue } from "@mui/material/colors";
import RelatedBlogs from "./relatedSlide";
import { Container } from "@mui/material";
import ShareThought from "./share-thoughts";
import blogStyle from "./styles/blog.module.scss";
import "./styles/blog.css";
import BlogStyleWrapper from "./style-wrapper";
import "@/malda_rte/rte/themes/PlaygroundEditorTheme.css";

interface ServerReadProps {
    blog: Blog & {
        related_blogs: Blog[]
    };
}


const ServerRead: FunctionComponent<ServerReadProps> = ({ blog }) => {
    return (
        <>
            <Progresss />
            <BlogHeader
                blog={blog}
            />
            <div
                className={`${styles.container}`}
            >
                <div
                    className={blogStyle['blog-content']}
                >
                    <div className={blogStyle['outline']}>
                        <TableOfContent />
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2
                    }}>
                        <div
                            className={`malda-rte ${styles['px-4']} + ${styles['mw-md']}`}
                        >
                            <BlogStyleWrapper>
                                <div
                                    dangerouslySetInnerHTML={{ __html: blog.body }}
                                    className="malda-rte"
                                    id={"entire-blog"}
                                />
                            </BlogStyleWrapper>
                        </div>
                        <div
                            style={{
                                position: "sticky",
                                top: 80,
                                paddingRight: "10px"
                            }}
                        >
                            <ShareButtons blog={blog} />
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    width: "100%",
                    margin: "100px 0"
                }}
            >
                <SubscribeCta />
            </div>
            <Container
                maxWidth={"xl"}
            >
                <RelatedBlogs
                    blogs={blog.related_blogs}
                />
            </Container>
            <Container maxWidth={"xl"}>
                <ShareThought
                    blog={blog}
                />
            </Container>
        </>
    );
}

export default ServerRead;