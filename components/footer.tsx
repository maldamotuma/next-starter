import { Typography, TypographyProps } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";

 
const Footer: FunctionComponent<TypographyProps> = (props) => {
    return ( 
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                  Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
              </Typography>
    );
}
 
export default Footer;