"use client";
import { FunctionComponent, useEffect } from "react";
import * as tocbot from 'tocbot';
import "./styles/table-of-content.css";
import { Box } from "@mui/material";
import "@/styles/tocbot.css"
import SimpleBar from "simplebar-react";
import slugify from "slugify";

interface TableOfContentProps {

}

const TableOfContent: FunctionComponent<TableOfContentProps> = () => {

    useEffect(() => {
        tocbot.init({
            tocSelector: "#tc-container",
            contentSelector: "#entire-blog",
            headingSelector: "h1, h2, h3, h4",
            hasInnerContainers: true,
            headingsOffset: 85,
            scrollSmoothOffset: -85,
            headingObjectCallback(objM, node) {
                const obj = { ...objM } as {
                    headingLevel: number;
                    textContent: string;
                    id: string;
                };

                const hId = slugify(obj.textContent);
                obj.id = hId;
                node.setAttribute("id", hId);
                return obj;
            },
        });


        return () => {
        }
    }, [])

    return (
        <SimpleBar
            style={{
                height: "calc(100vh - 80px)",
                width: "300px",
            }}
        >
            <Box
                id="tc-container"
                // @ts-ignore
                sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    pr: "10px",
                    "& a.toc-link": {
                        py: .5,
                        display: "block",
                        textDecoration: "none",
                        color: "inherit",
                        borderLeft: 0,
                        borderColor: "primary.main",
                        transition: ".2s all linear"
                    },
                    "& a.is-active-link": {
                        color: "primary.main",
                        borderLeft: 3,
                        pl: 1
                    }
                }}
            >

            </Box >
        </SimpleBar>
    );
}

export default TableOfContent;