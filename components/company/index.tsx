"use client"

import { useInitialCall } from "@/hooks/remote-call";
import { Box, CardMedia, Container } from "@mui/material";
import { FunctionComponent } from "react";
import { Company } from "./types";
import Error from "next/error";
import PlaygroundApp from "@/malda_rte/rte/App";
import Wrapper from "@/components/wrapper";
import Title from "@/components/home/title";
import { server_url } from "@/config/variables";
import NotFound from "../error/notFound";
import BlogStyleWrapper from "../blog/style-wrapper";

interface CompanyCopyProps {
    copy?: Company;
}

const CompanyCopy: FunctionComponent<CompanyCopyProps> = ({ copy }) => {
    return (
        <Wrapper>
            <Container maxWidth={"md"}>
                {
                    copy ?
                        <>
                            <Title
                                primary={copy.title}
                                primaryProps={{
                                    align: "left"
                                }}
                            />
                            <CardMedia
                                component={"img"}
                                src={`${server_url}/blog/${copy.image}?width=750`}
                                sx={{
                                    aspectRatio: "5/3",
                                    borderRadius: 4,
                                    display: "block",
                                    bgcolor: "divider"
                                }}
                            />
                            <Box
                                className={"malda-rte"}
                                sx={{
                                    width: "100%"
                                }}
                            >
                                <BlogStyleWrapper>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: copy.content }}
                                    >
                                    </div>
                                </BlogStyleWrapper>
                            </Box>
                        </>
                        :
                        <NotFound />
                }
            </Container>
        </Wrapper>
    );
}


export default CompanyCopy;