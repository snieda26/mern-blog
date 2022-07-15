import { configureStore } from '@reduxjs/toolkit';
import { postsReducers } from './slices/posts';
import { authReducer } from './slices/auth';

const store = configureStore({
    reducer: {
        posts: postsReducers,
        auth: authReducer
    }
})


export default store;