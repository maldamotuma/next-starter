import Footers from "@/components/footers";
import CAS from "@/components/home/call-to-actions";
import Hero from "@/components/home/hero";
import ResponsiveAppBar from "@/components/home/nav/appbar";
import Header from "@/components/home/nav/header";
import Partners from "@/components/home/partners";
import Pricing from "@/components/home/priving";
import Services from "@/components/home/services";
import { Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface HomePageProps {

}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <>
        <Header />
        <ResponsiveAppBar />
        <Hero />
        <Stack spacing={15} sx={{pt: 15}} alignItems={"center"}>
        <Partners />
        <Services />
        <CAS />
        <Pricing />
        <Footers />
        </Stack>
    </>
  );
}

export default HomePage;