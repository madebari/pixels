import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
const initialState = {
    product_category: [],
    product_category_loading:false,
    product_category_success: false,
    product_category_error: false,
    product_category_message: null
}


import { BASE_URL } from '../../constants';

export const allproductcategory = createAsyncThunk(
  "product_category/allproductcategory",
  async (_,thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}product_category`)
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


const productcategorySlice = createSlice({
  name: 'product_category',
  initialState,
  reducers: {
    resetproduct_category: (state, action) => {
      state.product_category_error = false;
      state.product_category_success = false;
      state.product_category_loading = false;
      state.product_category_message = null;
    },
    resetErrorproduct_category: (state, ation) => {
      state.product_error= false;
      state.product_message = null;
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(allproductcategory.fulfilled, (state, action) => {
        state.product_category_success = true;
        state.product_category_error = false;
        state.product_category_message = null;
        state.product_category_loading = false;
        state.product_category = action.payload.data;
      })
      .addCase(allproductcategory.rejected, (state, action) => {
        state.product_category_success = false;
        state.product_category_message = action.payload;
        state.product_category_error = true;
        state.product_category_loading = false;
      })
      .addCase(allproductcategory.pending, (state, action) => {
        state.product_category_loading = true;
      });
}
},

)

export const { resetproduct_category, resetErrorproduct_category } = productcategorySlice.actions
export default productcategorySlice.reducer