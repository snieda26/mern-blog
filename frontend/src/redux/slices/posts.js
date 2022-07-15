import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instanceAPI from '../../api/instance';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await instanceAPI.get('/posts').then(res => res);
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await instanceAPI.get('/tags').then(res => res);

    return data;
});

export const fetchRemovePost = createAsyncThunk("posts/fetchRemovePost", async (id) => {

    const { data } = await instanceAPI.delete(`/posts/${id}`)

    return data;
});

const initialState = {
    posts: {
        items: [],
        status: 'loadidng'
    },
    tags: {
        items: [],
        status: 'loadidng'
    },
};


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = 'Error'
        },
        // fetch tags
        [fetchTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload
            state.tags.status = 'loaded'
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = []
            state.tags.status = 'Error'
        },

        // remove post
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(post => post._id !== action.meta.arg)
        },
        [fetchRemovePost.fulfilled]: (state, action) => {
            state.posts.items = state.posts.items.filter(post => post._id !== action.payload.id)
        },
        [fetchRemovePost.rejected]: (state, error) => {
            if (error) {
                console.error(error)
            }
            state.posts.items = []
            state.posts.status = 'Error'
        },
    }
});


export const postsReducers = postsSlice.reducer