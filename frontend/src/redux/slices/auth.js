import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instanceAPI from "../../api/instance";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
    const { data } = await instanceAPI.post("auth/login", params);
    return data;
});


export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
    const { data } = await instanceAPI.get("auth/me");

    return data;
});


export const fetchRegisterMe = createAsyncThunk("auth/fetchRegisterMe", async (params) => {
    const { data } = await instanceAPI.post('auth/register', params)

    return data;
})




const initialState = {
    data: null,
    isAuth: false,
    status: "loading"
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuth = false
            state.data = null
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
            state.isAuth = true
        },
        [fetchAuth.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },
        // auth me
        [fetchAuthMe.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
            state.isAuth = true
        },
        [fetchAuthMe.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },


        // register user
        [fetchRegisterMe.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchRegisterMe.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
            state.isAuth = true
        },
        [fetchRegisterMe.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },
    }
})


export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions