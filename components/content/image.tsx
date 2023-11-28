import { Box } from "@mui/material";
import { FunctionComponent } from "react";

interface ContentIMageProps {

}

const ContentIMage: FunctionComponent<ContentIMageProps> = () => {
    return (
        <Box
            component={"img"}
            alt=""
            src={"/about.png"}
            width="100%"
        />
    );
}

export default ContentIMage;