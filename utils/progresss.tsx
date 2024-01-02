"use client"
import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { motion, useScroll } from "framer-motion";
import { blue } from "@mui/material/colors";

interface ProgresssProps {

}

const Progresss: FunctionComponent<ProgresssProps> = () => {
    const { scrollYProgress } = useScroll();

    return (
        <Box
            sx={{
                "& .progress-bar": {
                    position: "fixed",
                    top: {
                        xs: 54,
                        md: 69
                    },
                    left: 0,
                    right: 0,
                    height: "6px",
                    background: theme => blue[theme.palette.mode === "light" ? 900 : 100],
                    transformOrigin: "0%",
                    zIndex: 9
                }
            }}
        >
            <motion.div
                className="progress-bar"
                style={{ scaleX: scrollYProgress }}
            />
        </Box >
    );
}

export default Progresss;