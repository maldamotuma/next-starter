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

interface CompanyCopyProps {
    slug: string;
}

const CompanyCopy: FunctionComponent<CompanyCopyProps> = ({ slug }) => {
    const { data: copy, status } = useInitialCall<Company | null>(`/company-copy/${slug}`, null, {
        ky: "copy"
    });

    return (
        <Wrapper>
            <Container maxWidth={"md"}>
                {
                    status === "pending" ?
                        <>Loading...</>
                        :
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
                                    <PlaygroundApp
                                        settings={{
                                            showTreeView: false
                                        }}
                                        notEditable
                                        value={copy.content}
                                    />
                                </Box>
                            </>
                            :
                            <Error statusCode={404} title="Page Not Found" />
                }
            </Container>
        </Wrapper>
    );
}


export default CompanyCopy;