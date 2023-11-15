import { statusTypes } from '@/config/types';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type userType = {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture: string;
    created_at: string;
}

export interface auth {
    status: statusTypes;
    user: userType | null;
}

const initialState: auth = {
    status: "pending",
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setAuthUser: (state, {payload}: PayloadAction<auth['user']>) => {
        state.user = payload;
      }
    },
  })

  // Action creators are generated for each case reducer function
export const { setAuthUser } = authSlice.actions

export default authSlice.reducer