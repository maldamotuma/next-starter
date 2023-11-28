import { Alert } from "@mui/material";
import { FunctionComponent } from "react";

interface MyPackagesProps {
    
}
 
const MyPackages: FunctionComponent<MyPackagesProps> = () => {
    return (
        <Alert severity="info">No Packages!</Alert>
    );
}
 
export default MyPackages;