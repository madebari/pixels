import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
const initialState = {
    events: [],
    event_loading:false,
    event_success: false,
    event_error: false,
    event_message: null
}


import { BASE_URL } from '../../constants';

export const allEvents = createAsyncThunk(
  "events/allEvents",
  async (_,thunkAPI) => {
    try {
      // const access_token = thunkAPI.getState().auth.user.access_token;
      // console.log(access_token)
      const response = await axios.get(`${BASE_URL}event`)
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


const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    reset: (state, action) => {
      state.event_error = false;
      state.event_success = false;
      state.event_loading = false;
      state.event_message = null;
    },
    resetError: (state, ation) => {
      state.event_error= false;
      state.event_message = null;
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(allEvents.fulfilled, (state, action) => {
        state.event_success = true;
        state.event_error = false;
        state.event_message = null;
        state.event_loading = false;
        state.events = action.payload.data;
      })
      .addCase(allEvents.rejected, (state, action) => {
        state.event_success = false;
        state.event_message = action.payload;
        state.event_error = true;
        state.event_loading = false;
      })
      .addCase(allEvents.pending, (state, action) => {
        state.event_loading = true;
      });
}
},

)

export const { reset, resetError } = eventSlice.actions
export default eventSlice.reducer