import { Typography, TypographyProps } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";


const Footer: FunctionComponent<TypographyProps> = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Typography component={Link} color="inherit" href="https://tech-scan.com">
        Tech-Scan
      </Typography>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Footer;