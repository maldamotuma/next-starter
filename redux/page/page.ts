import { Blog } from '@/components/blog/types';
import { statusTypes } from '@/config/types';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Page {
    status: statusTypes;
    home?: {
        blogs: Blog[]
    };
}

const initialState: Page = {
    status: "pending",
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setInitialPage: (state, { payload }: PayloadAction<Page>) => {
            return { ...payload };
        },
    },
})

// Action creators are generated for each case reducer function
export const { setInitialPage } = pageSlice.actions

export default pageSlice.reducer