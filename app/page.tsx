import Hero from "@/components/home/hero";
import ResponsiveAppBar from "@/components/home/nav/appbar";
import Header from "@/components/home/nav/header";
import { FunctionComponent } from "react";

interface HomePageProps {

}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <>
        <Header />
        <ResponsiveAppBar />
        <Hero />
    </>
  );
}

export default HomePage;