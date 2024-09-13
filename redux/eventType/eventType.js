import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
const initialState = {
    eventtype: [],
    eventtype_loading:false,
    eventtype_success: false,
    eventtype_error: false,
    eventtype_message: null
}


import { BASE_URL } from '../../constants';

export const allEventtype = createAsyncThunk(
  "eventtype/allEventtype",
  async (_,thunkAPI) => {
    try {
      // const access_token = thunkAPI.getState().auth.user.access_token;
      // console.log(access_token)
      const response = await axios.get(`${BASE_URL}event_type`)
      // data, {
      //   headers: { Authorization: "Bearer " + access_token },
      // });
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error)
      const errResponse =
        (error && error.response && error.response.data) ||
        (error && error.message && error.AxiosError);
      // console.log(errResponse)
      const message = errResponse?.message
        ? errResponse.message
        : errResponse.detail;
      //  console.log(message)
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const eventtypeSlice = createSlice({
  name: 'eventtype',
  initialState,
  reducers: {
    resettype: (state, action) => {
      state.eventtype_error = false;
      state.eventtype_success = false;
      state.eventtype_loading = false;
      state.eventtype_message = null;
    },
    resetErrortype: (state, ation) => {
      state.eventtype_error= false;
      state.eventtype_message = null;
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(allEventtype.fulfilled, (state, action) => {
        state.eventtype_success = true;
        state.eventtype_error = false;
        state.eventtype_message = null;
        state.eventtype_loading = false;
        state.eventtype = action.payload.data;
      })
      .addCase(allEventtype.rejected, (state, action) => {
        state.eventtype_success = false;
        state.eventtype_message = action.payload;
        state.eventtype_error = true;
        state.eventtype_loading = false;
        state.eventtype = []
      })
      .addCase(allEventtype.pending, (state, action) => {
        state.eventtype_loading = true;
      });
}
},

)

export const { resettype, resetErrortype } = eventtypeSlice.actions
export default eventtypeSlice.reducer