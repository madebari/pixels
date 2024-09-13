import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
const initialState = {
    venue: [],
    venue_loading:false,
    venue_success: false,
    venue_error: false,
    venue_message: null
}


import { BASE_URL } from '../../constants';

export const allvenue = createAsyncThunk(
  "venue/allvenue",
  async (_,thunkAPI) => {
    try {
      // const access_token = thunkAPI.getState().auth.user.access_token;
      // console.log(access_token)
      const response = await axios.get(`${BASE_URL}venue`)
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


const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {
    reset: (state, action) => {
      state.venue_error = false;
      state.venue_success = false;
      state.venue_loading = false;
      state.venue_message = null;
    },
    resetError: (state, ation) => {
      state.venue_error= false;
      state.venue_message = null;
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(allvenue.fulfilled, (state, action) => {
        state.venue_success = true;
        state.venue_error = false;
        state.venue_message = null;
        state.venue_loading = false;
        state.venue = action.payload.data;
      })
      .addCase(allvenue.rejected, (state, action) => {
        state.venue_success = false;
        state.venue_message = action.payload;
        state.venue_error = true;
        state.venue_loading = false;
      })
      .addCase(allvenue.pending, (state, action) => {
        state.venue_loading = true;
      });
}
},

)

export const { resetvenue, resetErrorVenue } = venueSlice.actions
export default venueSlice.reducer