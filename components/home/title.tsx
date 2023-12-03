import { Typography, TypographyProps } from "@mui/material";
import { FunctionComponent } from "react";

interface TitleProps {
    primary?: string;
    secondary?: string;
    primaryProps?: TypographyProps;
    secondaryProps?: TypographyProps;
}
 
const Title: FunctionComponent<TitleProps> = ({primary, secondary, primaryProps, secondaryProps}) => {
    return (
        <>
        <Typography
            align="center"
            fontSize={"2em"}
            fontWeight={600}
            {...primaryProps}
            >{primary}</Typography>
            <Typography
            align="center"
            fontSize={"1.5em"}
            fontWeight={500}
            color={"text.secondary"}
            sx={{
                mb: 4
            }}
            {...secondaryProps}
            >
                {secondary}
            </Typography>
        </>
    );
}
 
export default Title;