"use client"


import Footer from "@/components/footer";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Container, Grid, useTheme } from "@mui/material";
import { FunctionComponent, ReactNode, useEffect } from "react";
import { useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'
import FullBackDrop from "@/components/loading/full-back-drop";
import { server_url } from "@/config/variables";
import SimpleBar from "simplebar-react";

interface AuthLayoutProps {
  children: ReactNode | ReactNode[]
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ children }) => {
  const auth = useAppSelector(state => state.auth);
  const router = useRouter();
  const theme = useTheme();


  useEffect(() => {
    if (auth.status !== "pending" && auth.user) {
      router.push("/")
    }

    return () => {

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  if (auth.status === "rejected") {
    return (
      <>
        Something Went Wrong
      </>
    )
  }

  return (
    <>
      <FullBackDrop open={auth.status === "pending"} />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url(/auth.jpg)',
            backgroundRepeat: 'no-repeat',
            // backgroundColor: (t) =>
            //   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            p: {
              xs: 0,
              sm: 5
            }
          }}
        >
          <Box
            sx={{
              p: 3,
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 1,
              display: {
                xs: 'none',
                sm: "inline-block"
              }
            }}
          >
            <Box
              component={"img"}
              src={`${server_url}/logo/logo-${theme.palette.mode === "light" ? "dark" : "light"}-large.png`}
              sx={{
                maxWidth: 250
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <SimpleBar
            style={{
              height: "100vh"
            }}
          >
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
              <Box
                component={"img"}
                src={`${server_url}/logo/logo-${theme.palette.mode === "light" ? "dark" : "light"}.png`}
                sx={{
                  height: 50
                }}
              />
              <Container
                sx={{
                  width: "100%",
                  maxWidth: "500px !important",
                  border: 1,
                  borderColor: "divider",
                  p: 2,
                  pb: 3,
                  mb: 5,
                  mt: 2
                }}
              >
                {
                  children
                }
              </Container>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ py: 1 }}>
                <Footer />
              </Box>
            </Box>

          </SimpleBar>
        </Grid>
      </Grid>
    </>
  );
}

export default AuthLayout;