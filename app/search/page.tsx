import ComboBox from "@/components/nav/Search";
import Wrapper from "@/components/wrapper";
import { Box } from "@mui/material";
import Script from "next/script";
import { FunctionComponent } from "react";

interface SearchPageProps {

}

const SearchPage: FunctionComponent<SearchPageProps> = () => {
    return (
        <Wrapper>
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
            <Box
                sx={{
                    p: 2
                }}
            >
                <ComboBox />
            </Box>
        </Wrapper>
    );
}

export default SearchPage;