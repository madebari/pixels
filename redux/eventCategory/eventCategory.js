import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
const initialState = {
    eventcategory: [],
    eventcategory_loading:false,
    eventcategory_success: false,
    eventcategory_error: false,
    eventcategory_message: null
}


import { BASE_URL } from '../../constants';

export const allEventcategory = createAsyncThunk(
  "eventcategory/allEventcategory",
  async (_,thunkAPI) => {
    try {
      
      const response = await axios.get(`${BASE_URL}event_category`)
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


const eventcategorySlice = createSlice({
  name: 'eventcategory',
  initialState,
  reducers: {
    resetcategory: (state, action) => {
      state.eventcategory_error = false;
      state.eventcategory_success = false;
      state.eventcategory_loading = false;
      state.eventcategory_message = null;
    },
    resetErrorcategorye: (state, ation) => {
      state.eventcategory_error= false;
      state.eventcategory_message = null;
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(allEventcategory.fulfilled, (state, action) => {
        state.eventcategory_success = true;
        state.eventcategory_error = false;
        state.eventcategory_message = null;
        state.eventcategory_loading = false;
        state.eventcategory = action.payload.data;
      })
      .addCase(allEventcategory.rejected, (state, action) => {
        state.eventcategory_success = false;
        state.eventcategory_message = action.payload;
        state.eventcategory_error = true;
        state.eventcategory_loading = false;
        state.eventcategory = []
      })
      .addCase(allEventcategory.pending, (state, action) => {
        state.eventcategory_loading = true;
      });
}
},

)

export const { resetcategory, resetErrorcategory } = eventcategorySlice.actions
export default eventcategorySlice.reducer