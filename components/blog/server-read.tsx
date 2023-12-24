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

interface ServerReadProps {
    blog: Blog & {
        related_blogs: Blog[]
    };
}

const blogContent = `
    <p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">Blog tours can be a great way to drum up early excitement about your book’s release. But what are the benefits of a blog tour, and how can you start your own? Our publicists are here to answer frequently asked questions about blog tours.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><h1 class="PlaygroundEditorTheme__h1" dir="ltr" style="text-align: start;"><b><strong class="PlaygroundEditorTheme__textBold" style="white-space: pre-wrap;">What is a blog tour?</strong></b></h1><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">A blog tour is a set amount of time, usually a week or two, in which your book will be promoted across various websites and blogs. The dates are set in advance; each blog knows what material it will be posting, and the content should be unique to each blog.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">This can be confused with a “blog blitz,” which features various blogs all posting the exact same content at the same time. A blog tour should consist of original content, with a focus on higher trafficked sites.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><h1 class="PlaygroundEditorTheme__h1" dir="ltr" style="text-align: start;"><b><strong class="PlaygroundEditorTheme__textBold" style="white-space: pre-wrap;">What are the benefits of putting your book on a blog tour?</strong></b></h1><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">Online exposure is the main benefit of using a blog tour to promote your book. It hits a different audience than, say, an NPR interview or local newspaper review. Sure, an unbiased review from a huge publication is fantastic publicity, but what the fans are saying can have a similar impact. A blog tour is also a great option for authors who want to avoid traveling to bookstores or are uncomfortable with public speaking.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><h2 class="PlaygroundEditorTheme__h2" dir="ltr" style="text-align: start;"><b><strong class="PlaygroundEditorTheme__textBold" style="white-space: pre-wrap;">What types of books work best for blog tours?</strong></b></h2><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">From our experience, genre fiction and YA novels receive the best responses. Those readers are generally more active online. The romance community in particular focuses heavily on online publicity, as there aren’t many traditional outlets, print or digital, that cover a wide variety of romance subgenres. But this isn’t an exhaustive list. Reach out to your team if you’d like to host a blog tour for a book that falls into a different category or genre.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><h3 class="PlaygroundEditorTheme__h3" dir="ltr" style="text-align: start;"><b><strong class="PlaygroundEditorTheme__textBold" style="white-space: pre-wrap;">How can an author ensure his or her blog tour is a success?</strong></b></h3><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">The first step of a successful blog tour is working with your publishing team to make sure review copies will be available to the bloggers you’re contacting, whether physical copies or through NetGalley. You don’t want to reach out to bloggers and have them express interest and then be unable to provide them with a review copy shortly after.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">Next, it’s important to stay organized. Create a document where you keep track of the blogs you’ve reached out to, who has expressed interest, and on which dates they’re planning to post. Don’t lose track of your own tour!</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><h1 class="PlaygroundEditorTheme__h1" dir="ltr" style="text-align: start;"><b><strong class="PlaygroundEditorTheme__textBold" style="white-space: pre-wrap;">How can an author work with his or her publicist to set up an effective blog tour?</strong></b></h1><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">The first and most important thing is to be open and honest with your publicist about your goals. If you want to appear on particular blogs, be sure to tell your publicist. He or she probably has a good idea of the type of site that will be interested in your book, but will be happy to hear your thoughts.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">It’s worth mentioning again: blogs love exclusive content. If you’re interested in providing guest posts, interviews, exclusive excerpts, personal essays, content, images, and so forth, tell your publicist.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">Just because the blog tour is online doesn’t mean it isn’t time-consuming. Be up front with your publicist about your busy schedule. Don’t overcommit and put yourself—or your publicist—in the position of having to cancel an appearance at the last minute.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><h2 class="PlaygroundEditorTheme__h2" dir="ltr" style="text-align: start;"><b><strong class="PlaygroundEditorTheme__textBold" style="white-space: pre-wrap;">How can an author find bloggers for their tour?</strong></b></h2><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">Do your research! There’s a vast world of bloggers out there looking for their next great read. You can start by asking fellow-author friends for a list of blogs they have been featured on and reaching out to your publicist for recommendations. Meanwhile, search for blogs that are relevant to the topic of your book, or those that frequently write about books in your genre, and make a list.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><h3 class="PlaygroundEditorTheme__h3" dir="ltr" style="text-align: start;"><b><strong class="PlaygroundEditorTheme__textBold" style="white-space: pre-wrap;">What is the best timing for a blog tour?</strong></b></h3><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">Reach out six weeks prior to publication. It’s ideal for blogs to cover a book right around its publication date, specifically the week before and the week after publication, to generate buzz.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><b><strong class="PlaygroundEditorTheme__textBold" style="white-space: pre-wrap;">What are some best practices when preparing for a blog tour?</strong></b></p><ul class="PlaygroundEditorTheme__ul"><li value="1" class="PlaygroundEditorTheme__listItem"><span style="white-space: pre-wrap;">Establish a rapport/relationship with someone before asking them to review your book or host you on their site or blog. You can begin by commenting on various blogs and becoming part of that community.</span></li><li value="2" class="PlaygroundEditorTheme__listItem"><span style="white-space: pre-wrap;">Be specific about exactly what you would like to provide or do (guest post, interview, exclusive excerpt, etc.).</span></li><li value="3" class="PlaygroundEditorTheme__listItem"><span style="white-space: pre-wrap;">Offer a giveaway to go along with the post. It’s not required, but bloggers love being able to offer prizes to their audience, and it increases their traffic.</span></li><li value="4" class="PlaygroundEditorTheme__listItem"><span style="white-space: pre-wrap;">If they say yes, get your material to them on time and thank them again for the opportunity.</span></li><li value="5" class="PlaygroundEditorTheme__listItem"><span style="white-space: pre-wrap;">When you turn in your material, also include your book cover image, author photo, author bio, and buy links.</span></li><li value="6" class="PlaygroundEditorTheme__listItem"><span style="white-space: pre-wrap;">Tweet about the appearance once it’s live and @mention the blog/blogger.</span></li></ul><p class="PlaygroundEditorTheme__paragraph" style="text-align: start;"><span style="white-space: pre-wrap;">&nbsp;</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><b><strong class="PlaygroundEditorTheme__textBold" style="white-space: pre-wrap;">How do you measure the success of a blog tour?</strong></b></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">A good place to start is to track the number and type of comments an author appearance on a blog generates, or ask the blogger how many views the post received. Compare these numbers to other posts on the same blog and on similar blogs to see which posts were successful in reaching your audience.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">Success is subjective and depends on your goals. Consider quality vs. quantity. One great guest post on a specific blog with influence can help the community get to know more about you, while the quantity of posts helps spread general awareness of your book. Both are useful for building your profile. Focusing on only the blogs perceived to be “biggest” and on the highest traffic may keep you from finding your most loyal fans.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">You can track blog and media coverage of your tour through&nbsp;</span><a href="https://support.google.com/alerts/?page=faq.html#175927" target="_blank" class="PlaygroundEditorTheme__link"><span style="white-space: pre-wrap;">Google Alerts</span></a><span style="white-space: pre-wrap;">&nbsp;or by calculating&nbsp;</span><a href="https://www.brandwatch.com/2014/03/the-beginners-guide-to-calculating-social-media-roi/" target="_blank" class="PlaygroundEditorTheme__link"><span style="white-space: pre-wrap;">social media impressions</span></a><span style="white-space: pre-wrap;">. But if you want to make inroads with in-depth guest pieces, you should measure your success by the level of engagement that readers have with your piece—through comments, social promotion, and other online conversations.</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><br></p>
`

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
                            id={"entire-blog"}
                            className={`malda-rte ${styles['px-4']} + ${styles['mw-md']}`}
                        >
                            <div
                                dangerouslySetInnerHTML={{ __html: blogContent }}
                            />
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