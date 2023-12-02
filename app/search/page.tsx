import ComboBox from "@/components/nav/Search";
import Wrapper from "@/components/wrapper";
import { Box } from "@mui/material";
import { FunctionComponent } from "react";

interface SearchPageProps {

}

const SearchPage: FunctionComponent<SearchPageProps> = () => {
    return (
        <Wrapper>
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