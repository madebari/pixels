import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
const initialState = {
    product: [],
    product_loading:false,
    product_success: false,
    product_error: false,
    product_message: null
}


import { BASE_URL } from '../../constants';

export const allproduct = createAsyncThunk(
  "product/allproduct",
  async (_,thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}product`)
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


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetproduct: (state, action) => {
      state.product_error = false;
      state.product_success = false;
      state.product_loading = false;
      state.product_message = null;
    },
    resetErrorproduct: (state, ation) => {
      state.product_error= false;
      state.product_message = null;
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(allproduct.fulfilled, (state, action) => {
        state.product_success = true;
        state.product_error = false;
        state.product_message = null;
        state.product_loading = false;
        state.product = action.payload.data;
      })
      .addCase(allproduct.rejected, (state, action) => {
        state.product_success = false;
        state.product_message = action.payload;
        state.product_error = true;
        state.product_loading = false;
      })
      .addCase(allproduct.pending, (state, action) => {
        state.product_loading = true;
      });
}
},

)

export const { resetproduct, resetErrorproduct } = productSlice.actions
export default productSlice.reducer