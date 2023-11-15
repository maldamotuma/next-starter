import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface ServiceCardProps {
    
}
 
const ServiceCard: FunctionComponent<ServiceCardProps> = () => {
    return (
        <Card>
            <CardHeader
            title={<>Lorem ipsum dolor sit amet consectetur.</>}
            avatar={<Box
            component={"img"}
            src={"https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
            alt=""
            width={"100px"}
            sx={{
                borderRadius: 2
            }}
            />}
            titleTypographyProps={{
                fontWeight: 600,
                fontSize: "1.1em"
            }}
            />
            <CardContent sx={{py: 0}}>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur fuga commodi voluptatibus neque, nihil quod impedit doloribus deleniti explicabo accusantium.
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                endIcon={<ArrowForward />}
                >
                    Lear More
                </Button>
            </CardActions>
        </Card>
    );
}
 
export default ServiceCard;