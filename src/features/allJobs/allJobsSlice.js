import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios'
// import { getAllJobsThunk, showStatsThunk } from './allJobsThunk';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk('/allJobs/getJobs', async (_, thunkAPI) => {
  const url = '/jobs'
  try {
    const resp = await customFetch.get(url,{
      headers:{
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`
      }
    })
    // console.log(resp)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue('There was an error')
  }
})

export const showStats = createAsyncThunk('allJobs/showStats', async(_,thunkAPI) => {
  try {
    const resp = await customFetch.get('/jobs/stats',{
      headers:{
        Authorization:`Bearer ${thunkAPI.getState().user.user.token}`
      }
    })
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
})

const allJobsSlice = createSlice({
  name:'allJobs',
  initialState,
  reducers:{
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    }
  },
  extraReducers: {
      [showStats.pending]: (state) => {
        state.isLoading = true;
      },
      [showStats.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      },
      [showStats.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      },
      [getAllJobs.pending]: (state) => {
        state.isLoading = true;
      },
      [getAllJobs.fulfilled]: (state, { payload }) => {
        console.log(payload)
        state.isLoading = false;
        state.jobs = payload.jobs;
        // state.numOfPages = payload.numOfPages;
        // state.totalJobs = payload.totalJobs;
      },
      [getAllJobs.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      }
  }
})

export const {showLoading, hideLoading} = allJobsSlice.actions
export default allJobsSlice.reducer;
