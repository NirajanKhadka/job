import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
import customFetch from '../../utils/axios'
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localstorage'


const initialState = {
    isLoading:false,
    isSideBarOpen:false,
    user:getUserFromLocalStorage(),
}

export const loginUser = createAsyncThunk('user/loginUser', async(user,thunkAPI) => {
    try{
        const resp = await customFetch.post('/auth/login', user)
        return resp.data
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const registerUser = createAsyncThunk('user/registerUser', async(user,thunkAPI) => {
    try{
        const resp = await customFetch.post('/auth/register', user)
        return resp.data
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        toggleSidebar: (state) => {state.isSideBarOpen = !state.isSideBarOpen},
        logoutUser : (state) => {
            state.user = null
            state.isSideBarOpen = false
            removeUserFromLocalStorage()
        }
    },
    extraReducers:{
        [registerUser.pending] : (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled] : (state,{payload}) => {
            const {user} = payload
            state.isLoading = false
            state.user = user
            addUserToLocalStorage(user)
            toast.success(`hello ${user.name}`)
        },    
        [registerUser.rejected] : (state,{payload}) => {
            state.isLoading = false
            toast.error(payload)
        },
        [loginUser.pending] : (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled] : (state,{payload}) => {
            const {user} = payload
            state.isLoading = false
            state.user = user
            addUserToLocalStorage(user)
            toast.success(`Welcome back ${user.name}`)
        },    
        [loginUser.rejected] : (state,{payload}) => {
            state.isLoading = false
            toast.error(payload)
        }     
    }
})

export const {toggleSidebar ,logoutUser} = userSlice.actions
export default userSlice.reducer