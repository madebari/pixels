import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
const initialState = {
    organizer: [],
    organizer_loading:false,
    organizer_success: false,
    organizer_error: false,
    organizer_message: null
}


import { BASE_URL } from '../../constants';

export const allorganizer = createAsyncThunk(
  "organizer/allorganizer",
  async (_,thunkAPI) => {
    try {
      // const access_token = thunkAPI.getState().auth.user.access_token;
      // console.log(access_token)
      const response = await axios.get(`${BASE_URL}organizer`)
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


const organizerSlice = createSlice({
  name: 'organizer',
  initialState,
  reducers: {
    resetorganizer: (state, action) => {
      state.organizer_error = false;
      state.organizer_success = false;
      state.organizer_loading = false;
      state.organizer_message = null;
    },
    resetErrorOrganizer: (state, ation) => {
      state.organizer_error= false;
      state.organizer_message = null;
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(allorganizer.fulfilled, (state, action) => {
        state.organizer_success = true;
        state.organizer_error = false;
        state.organizer_message = null;
        state.organizer_loading = false;
        state.organizer = action.payload.data;
      })
      .addCase(allorganizer.rejected, (state, action) => {
        state.organizer_success = false;
        state.organizer_message = action.payload;
        state.organizer_error = true;
        state.organizer_loading = false;
      })
      .addCase(allorganizer.pending, (state, action) => {
        state.organizer_loading = true;
      });
}
},

)

export const { resetorganizer, resetErrorOrganizer } = organizerSlice.actions
export default organizerSlice.reducer