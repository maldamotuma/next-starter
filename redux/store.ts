import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import pageReducer from './page/page'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    page: pageReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;