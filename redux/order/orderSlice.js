import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
const initialState = {
    orders: [],
    order_loading:false,
    order_success: false,
    order_error: false,
    order_message: null
}


import { BASE_URL } from '../../constants';

export const allOrders = createAsyncThunk(
  "orders/allOrders",
  async (_,thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}register`)
      return response;
    } catch (error) {
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

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (_,thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}register`)
      return response;
    } catch (error) {
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


const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    reset: (state, action) => {
      state.order_error = false;
      state.order_success = false;
      state.order_loading = false;
      state.order_message = null;
    },
    resetError: (state, ation) => {
      state.order_error= false;
      state.order_message = null;
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(allOrders.fulfilled, (state, action) => {
        state.order_success = true;
        state.order_error = false;
        state.order_message = null;
        state.order_loading = false;
        state.orders = action.payload.data;
      })
      .addCase(allOrders.rejected, (state, action) => {
        state.order_success = false;
        state.order_message = action.payload;
        state.order_error = true;
        state.order_loading = false;
      })
      .addCase(allOrders.pending, (state, action) => {
        state.order_loading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.order_success = true;
        state.order_error = false;
        state.order_message = null;
        state.order_loading = false;
        state.orders = action.payload.data;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.order_success = false;
        state.order_message = action.payload;
        state.order_error = true;
        state.order_loading = false;
      })
      .addCase(addOrder.pending, (state, action) => {
        state.order_loading = true;
      });
}
},

)

export const { reset, resetError } = orderSlice.actions
export default orderSlice.reducer