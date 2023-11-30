import { Company } from "@/components/company/types";
import { server_url } from "@/config/variables";
import { Card, CardHeader, CardMedia, CardActions, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { maxLine } from "../utils/helpers";

interface CompanyCardProps {
    copy: Company
}

const CompanyCard: FunctionComponent<CompanyCardProps> = ({
    copy
}) => {
    return (
        <Card
            variant={"outlined"}
            sx={{
                border: 0
            }}
        >
            <CardMedia
                component={"img"}
                src={`${server_url}/blog/${copy.image}`}
                sx={{
                    aspectRatio: "5/3",
                    borderRadius: 3
                }}
            />
            <CardHeader
                title={copy.title}
                subheader={`/${copy.slug}`}
                titleTypographyProps={{
                    sx: maxLine(2)
                }}
            />
        </Card>
    );
}

export default CompanyCard;