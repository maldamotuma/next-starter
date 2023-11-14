import Footer from "@/components/footer";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Grid } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode | ReactNode[]
}
 
const AuthLayout: FunctionComponent<AuthLayoutProps> = ({children}) => {
    return (
        <>
         <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            // backgroundColor: (t) =>
            //   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              pt: 8,
              px: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: '100vh'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlined />
            </Avatar>
            {
                children
            }
            <Box sx={{flexGrow: 1}}/>
            <Box sx={{py: 1}}>
                <Footer />
            </Box>
          </Box>
        </Grid>
      </Grid>
        </>
    );
}
 
export default AuthLayout;