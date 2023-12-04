import Content from "@/components/content";
import Footers from "@/components/footers";
import Blogs from "@/components/home/blogs";
import CAS from "@/components/home/call-to-actions";
import Contact from "@/components/home/contact";
import Hero from "@/components/home/hero";
import ResponsiveAppBar from "@/components/home/nav/appbar";
import Header from "@/components/home/nav/header";
import Partners from "@/components/home/partners";
import Pricing from "@/components/home/priving";
import ScrollPage from "@/components/home/scroll-page";
import Services from "@/components/home/services";
import Testimonials from "@/components/testimonials";
import { Stack } from "@mui/material";
import Script from "next/script";
import { FunctionComponent } from "react";

interface HomePageProps {

}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Q7PPML4EDC" />
      <Script>
        {
          `
          window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-Q7PPML4EDC');
        `
        }
      </Script>
      <ScrollPage />
      <Header />
      <ResponsiveAppBar />
      <Hero />
      <Stack spacing={15} sx={{ pt: 15, position: "relative" }} alignItems={"center"}>
        <Partners />
        <Content />
        <Services />
        <CAS />
        <Pricing />
        {/* <Testimonials /> */}
        <Blogs />
        <Contact />
        <Footers />
      </Stack>
    </>
  );
}

export default HomePage;