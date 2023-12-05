import { Backdrop } from "@mui/material";
import { FunctionComponent } from "react";
import CenterLoading from "./center";

interface FullBackDropProps {
    open: boolean;
}

const FullBackDrop: FunctionComponent<FullBackDropProps> = ({open}) => {
    return (
        <Backdrop
            open={open}
            sx={{
                zIndex: 9999
            }}
        >
            <CenterLoading />
        </Backdrop>
    );
}

export default FullBackDrop;