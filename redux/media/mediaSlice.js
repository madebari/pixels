import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
const initialState = {
    medias: [],
    media_loading:false,
    media_success: false,
    media_error: false,
    media_message: null
}


import { BASE_URL } from '../../constants';

export const allmedia = createAsyncThunk(
  "medias/allmedia",
  async (_,thunkAPI) => {
    try {
      // const access_token = thunkAPI.getState().auth.user.access_token;
      // console.log(access_token)
      const response = await axios.get(`${BASE_URL}media`)
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


const mediaSlice = createSlice({
  name: 'medias',
  initialState,
  reducers: {
    reset: (state, action) => {
      state.media_error = false;
      state.media_success = false;
      state.media_loading = false;
      state.media_message = null;
    },
    resetError: (state, ation) => {
      state.media_error= false;
      state.media_message = null;
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(allmedia.fulfilled, (state, action) => {
        state.media_success = true;
        state.media_error = false;
        state.media_message = null;
        state.media_loading = false;
        state.medias = action.payload.data;
      })
      .addCase(allmedia.rejected, (state, action) => {
        state.media_success = false;
        state.media_message = action.payload;
        state.media_error = true;
        state.media_loading = false;
      })
      .addCase(allmedia.pending, (state, action) => {
        state.media_loading = true;
      });
}
},

)

export const { resetmedia, resetErrorMedia } = mediaSlice.actions
export default mediaSlice.reducer