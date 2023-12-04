"use client"

import { Box, Container, Fab, Skeleton, Stack } from "@mui/material";
import { FunctionComponent, useCallback, useState } from "react";
import Testimony from "./testimony";
import { useKeenSlider } from 'keen-slider/react'
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Title from "../home/title";

interface TestimonialsProps {

}

const Testimonials: FunctionComponent<TestimonialsProps> = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            breakpoints: {
                "(min-width: 600px)": {
                    slides: {
                        perView: 2, spacing: 5,
                        // origin: "center",
                    },
                },
                "(min-width: 900px)": {
                    slides: {
                        perView: 2.75, spacing: 10,
                        // origin: "center",
                    },
                },
                "(min-width: 1200px)": {
                    slides: {
                        perView: 3.2, spacing: 10,
                        // origin: "center",
                    },
                },
            },
            slides: {
                perView: 1.2,
                spacing: 5,
                // origin: "center",
            },
            created() {
                setLoaded(true);
            }
        },
        [
            // add plugins here
        ]
    )

    const scrollPrev = useCallback(
        () => instanceRef.current?.prev(),
        [instanceRef]
    )
    const scrollNext = useCallback(
        () => instanceRef.current?.next(),
        [instanceRef]
    )

    return (
        <Box sx={{
            // px: "0 !important",
            width: "100%"
        }}>
            <Title
                primary="Testimonials"
                secondary="Our Customers mouth words!"
            />
            <Box
                ref={sliderRef}
                className="keen-slider"
            >
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(tst => (
                        <Box
                            key={`testimony-${tst}`}
                            className="keen-slider__slide"
                        >
                            {
                                loaded ?
                                    <Testimony />
                                    :
                                    <Skeleton
                                        variant="rounded"
                                        width={"100%"}
                                        height={250}
                                    />
                            }
                        </Box>
                    ))
                }
            </Box>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    gap: 2,
                    pt: 3
                }}
            >
                <Fab
                    color="primary"
                    size="small"
                    sx={{
                        zIndex: 1
                    }}
                    onClick={scrollPrev}
                >
                    <ArrowBack />
                </Fab>
                <Fab
                    color="primary"
                    size="small"
                    sx={{
                        zIndex: 1
                    }}
                    onClick={scrollNext}
                >
                    <ArrowForward />
                </Fab>
            </Box>
        </Box>
    );
}

export default Testimonials;