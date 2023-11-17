"use client"

import { Box, Container, Fab, Skeleton, Stack } from "@mui/material";
import { FunctionComponent, useCallback, useState } from "react";
import Testimony from "./testimony";
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Title from "../home/title";

interface TestimonialsProps {

}

const Testimonials: FunctionComponent<TestimonialsProps> = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            // breakpoints: {

            // },
            slides: {
                origin: "center",
                perView: 3.2,
                // perView: 1.2,
                spacing: 15,
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
        []
    )
    const scrollNext = useCallback(
        () => instanceRef.current?.next(),
        []
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