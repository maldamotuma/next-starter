"use client";
import { FunctionComponent, useCallback, useEffect } from "react";
import * as tocbot from 'tocbot';
import "./styles/table-of-content.css";
import { Box } from "@mui/material";
import { maxLine } from "../utils/helpers";
// @import 'tocbot/src/scss/tocbot';
import "@/styles/tocbot.css"
import SimpleBar from "simplebar-react";


interface TableOfContentProps {

}

const TableOfContent: FunctionComponent<TableOfContentProps> = () => {

    // const bindListeners = useCallback(
    //     (lnks: NodeListOf<Element>, hdngs: NodeListOf<Element>) => {
    //         lnks.forEach((lnk, i) => {
    //             lnk.addEventListener("click", () => {
    //                 alert("clicking!!");
    //                 hdngs[i].scrollIntoView();
    //             })
    //         })
    //     },
    //     [],
    // )


    useEffect(() => {
        let container = document.querySelector("#tc-container");
        tocbot.init({
            tocSelector: "#tc-container",
            contentSelector: "#entire-blog",
            headingSelector: "h1, h2, h3, h4",
            activeListItemClass: "active-list",
            activeLinkClass: "active-link",
            // onClick(e) {
            //     e.stopPropagation();
            //     // e.preventDefault();
            // },
            hasInnerContainers: true,
            headingObjectCallback(objM, node) {
                const obj = objM as {
                    headingLevel: number; textContent: string;
                };
                let div = document.createElement("div");
                div.className = "hl-" + obj.headingLevel + " hdgs"
                div.append(obj.textContent);
                div.addEventListener("click", () => {
                    node.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                })
                container?.append(div);
            },
        });

        // const headings = document.querySelectorAll("h2, h3, h4");
        // const outlineLinks = document.querySelectorAll("a.node-name--H2, a.node-name--H3, a.node-name--H4");
        // console.log(headings, outlineLinks);

        // bindListeners(outlineLinks, headings);

        return () => {
            // bindListeners(outlineLinks, headings);
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
                    "& .hdgs": {
                        cursor: "pointer",
                        ...(maxLine(2)),
                        py: .5,
                        pr: 1,
                        overflow: "hidden",
                        "&:hover": {
                            bgcolor: "divider"
                        }
                    },
                    "& .hl-1, & .hl-2": {
                        fontWeight: 600,
                        color: "text.primary",
                        my: 1,
                        pl: 1
                    },
                    "& .hl-3": {
                        pl: 2,
                        ml: 3,
                        color: "text.primary",
                        borderLeft: 1,
                        borderColor: "divider"
                    },
                    "& .hl-4": {
                        pl: 2,
                        ml: 3,
                        color: "text.secondary",
                        borderLeft: 1,
                        borderColor: "divider"
                    },
                    "& .active-list, & .active-link": {
                        color: "primary.main"
                    }
                }}
            >

            </Box >
        </SimpleBar>
    );
}

export default TableOfContent;