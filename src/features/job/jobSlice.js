import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
import customFetch from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localstorage'
import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice';

const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
};

export const createJob = createAsyncThunk('job/createJob', async(job, thunkAPI) => {
    try {
        const resp = await customFetch.post('/jobs', job, {
            headers:{
                Authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(clearValues())
        return resp.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const deleteJob = createAsyncThunk('job/deleteJob', async(jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const resp = await customFetch.delete(`/jobs/${jobId}`, {
            headers:{
                Authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(getAllJobs())
        return resp.data.msg
    } catch (error) {
        thunkAPI.dispatch(hideLoading())
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const editJob = createAsyncThunk('job/editJob', async({jobId, job}, thunkAPI) => {
    try {
        const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
            headers:{
                Authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(clearValues())
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

const jobSlice = createSlice({
    name:'job',
    initialState,
    reducers:{
        handleChange:(state, {payload:{name,value}}) => {
            state[name] = value
        },
        // anything returned from reducers is new state
        clearValues:() => {return {...initialState, jobLocation:getUserFromLocalStorage()?.location || ''}},
        setEditJob : (state, {payload}) => {return {...state, isEditing:true,...payload}}
    },
    extraReducers:{
        [createJob.pending] : (state) => {
            state.isLoading = true
        },
        [createJob.fulfilled] : (state, action) => {
            state.isLoading = false
            toast.success('Job successfully added')
        },
        [createJob.rejected] : (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        },
        [deleteJob.rejected] : (state, {payload}) => {
            toast.error(payload)
        },
        [deleteJob.fulfilled] : (state, {payload}) => {
            toast.success(payload)
        },
        [editJob.pending] : (state) => {
            state.isLoading = true
        },
        [editJob.fulfilled] : (state, action) => {
            state.isLoading = false
            toast.success('Job successfully edited')
        },
        [editJob.rejected] : (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        },

    }
})

export const { handleChange, clearValues, setEditJob } = jobSlice.actions
export default jobSlice.reducer