import { Avatar, CardHeader } from "@mui/material";
import { FunctionComponent } from "react";
import { Blog } from "./types";
import Link from "next/link";
import { server_url } from "@/config/variables";
import { blue } from "@mui/material/colors";

interface AuthorAvatarProps {
    blog: Blog
}

const AuthorAvatar: FunctionComponent<AuthorAvatarProps> = ({ blog }) => {
    return (
        <Link href={"/company/about-us"}
            style={{
                textDecoration: "none",
                display: "inline-block",
                // backgroundColor: "rgba(14,73,163, .2)",
                padding: "10px",
                borderRadius: "10px"
            }}
        >
            {
                blog.user ?
                    <CardHeader
                        sx={{
                            p: 0,
                            m: 0,
                            color: "#ffffff"
                        }}
                        subheader={"accepting job offers"}
                        subheaderTypographyProps={{
                            color: blue[100]
                        }}
                        avatar={<Avatar src={`${server_url}/avatar/small/${blog.user.profile_picture}`} />}
                        title={`${blog.user.first_name} ${blog.user.last_name}`}
                    />
                    :
                    <CardHeader
                        sx={{
                            p: 0,
                            m: 0,
                            color: "#ffffff"
                        }}
                        subheader={"accepting job offers"}
                        subheaderTypographyProps={{
                            color: blue[100]
                        }}
                        avatar={<Avatar src={`${server_url}/avatar/small/${blog.admin?.profile_picture}`} />}
                        title={`${blog.admin?.first_name} ${blog.admin?.last_name}`}
                    />
            }
        </Link>
    );
}

export default AuthorAvatar;