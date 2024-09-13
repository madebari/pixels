import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    user: null,
    user_loading:false,
    user_success: false,
    user_error: false,
    user_message: null,
    token:null,
    token_loading:false,
    token_success: false,
    token_error: false,
    token_message: null
}


import { BASE_URL, AUTH_URL } from '../../constants';

// const AUTH_URL = 'simple-jwt-login/v1/'

export const register = createAsyncThunk(
  "user/register",
  async (data,thunkAPI) => {
    try {
      const response = await axios.post(`${AUTH_URL}users`,data)
      return response;
    } catch (error) {
      const errResponse =
        (error && error.response && error.response.data) ||
        (error && error.message && error.AxiosError);
      const message = errResponse?.message
        ? errResponse.message
        : errResponse.detail;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const autologin = createAsyncThunk(
  "user/autologin",
  async (data,thunkAPI) => {
    try {
      const response = await axios.post(`${AUTH_URL}autologin`,data)
      return response;
    } catch (error) {
      const errResponse =
        (error && error.response && error.response.data) ||
        (error && error.message && error.AxiosError);
      const message = errResponse?.message
        ? errResponse.message
        : errResponse.detail;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const getToken = createAsyncThunk(
  "user/getToken",
  async (data,thunkAPI) => {
    try {
      const response = await axios.post(`${AUTH_URL}auth/`,data)
      return response;
    } catch (error) {
      console.log(error)
      const errResponse =
        (error && error.response && error.response.data) ||
        (error && error.message && error.AxiosError);
      const message = errResponse?.message
        ? errResponse.message
        : errResponse.detail;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const validateToken = createAsyncThunk(
  "user/validateToken",
  async (data,thunkAPI) => {
    try {
      const response = await axios.post(`${AUTH_URL}auth/validate`,data)
      return response;
    } catch (error) {
      const errResponse =
        (error && error.response && error.response.data) ||
        (error && error.message && error.AxiosError);
      const message = errResponse?.message
        ? errResponse.message
        : errResponse.detail;
      return thunkAPI.rejectWithValue(message);
    }
  }
);



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state, action) => {
      state.user_error = false;
      state.user_success = false;
      state.user_loading = false;
      state.user_message = null;
    },
    resetToken:(state, action) =>{
      state.token_error = false;
      state.token_success = false;
      state.token_loading = false;
      state.token_message = null;
    },
    resetError: (state, ation) => {
      state.user_error= false;
      state.user_message = null;
    },
    saveUser: (state,action)=>{
      state.user = action.payload;
    }
  },
  extraReducers: (builder)=>{
    builder.addCase(register.fulfilled, (state, action) => {
        state.token_success = true;
        state.token_error = false;
        state.token_message = null;
        state.token_loading = false;
        state.token = action.payload.data;
      })
      .addCase(register.rejected, (state, action) => {
        state.token_success = false;
        state.token_message = action.payload;
        state.token_error = true;
        state.token_loading = false;
        state.token = null;
      })
      .addCase(register.pending, (state, action) => {
        state.token_loading = true;
      }).addCase(autologin.fulfilled, (state, action) => {
        state.user_success = true;
        state.user_error = false;
        state.user_message = null;
        state.user_loading = false;
        state.user = action.payload.data;
      })
      .addCase(autologin.rejected, (state, action) => {
        state.user_success = false;
        state.user_message = action.payload;
        state.user_error = true;
        state.user_loading = false;
        state.user = null;
      })
      .addCase(autologin.pending, (state, action) => {
        state.user_loading = true;
      }).addCase(getToken.fulfilled, (state, action) => {
        state.token_success = true;
        state.token_error = false;
        state.token_message = null;
        state.token_loading = false;
        state.token = action.payload.data;
      })
      .addCase(getToken.rejected, (state, action) => {
        state.token_success = false;
        state.token_message = action.payload;
        state.token_error = true;
        state.token_loading = false;
        state.token = null;
      })
      .addCase(getToken.pending, (state, action) => {
        state.token_loading = true;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.user_success = true;
        state.user_error = false;
        state.user_message = null;
        state.user_loading = false;
        state.user = action.payload.data;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.user_success = false;
        state.user_message = action.payload;
        state.user_error = true;
        state.user_loading = false;
        state.user=null;
      })
      .addCase(validateToken.pending, (state, action) => {
        state.user_loading = true;
      });
}
// 
},

)

export const { reset, resetError, resetToken, saveUser } = userSlice.actions
export default userSlice.reducer