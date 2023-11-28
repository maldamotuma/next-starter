import { Box } from "@mui/material";
import { FunctionComponent } from "react";

interface HeroImageProps {

}

const HeroImage: FunctionComponent<HeroImageProps> = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end"
            }}
        >
            {/* <Box
                sx={{
                    position: "relative",
                    display: "inline-block",
                    width: "75%"
                }}
            >
                <Box
                    component="img"
                    src={"https://images.pexels.com/photos/3057960/pexels-photo-3057960.jpeg"}
                    width="100%"
                    sx={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        borderRadius: "50%"
                    }}
                />
                <Box
                    component="img"
                    src={"https://images.pexels.com/photos/6595777/pexels-photo-6595777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    width="70%"
                    sx={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        borderRadius: "50%",
                        position: "absolute",
                        bottom: "-15%",
                        left: "-15%",
                        boxShadow: 5,
                    }}
                />
            </Box> */}
            <Box
                component={"img"}
                src={"/hero.png"}
                sx={{
                    width: "100%",
                    pl: {
                        md: 5
                    }
                }}
            />
        </Box>
    );
}

export default HeroImage;