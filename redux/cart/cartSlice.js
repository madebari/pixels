import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  cart: [],
  cart_loading: false,
  cart_success: false,
  cart_error: false,
  cart_message: null,
  cart_add_sucess: false,
};

import { BASE_URL } from "../../constants";

export const allCart = createAsyncThunk("cart/allCart", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}cart`);
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
});

export const addCart = createAsyncThunk(
  "cart/addCart",
  async (data, thunkAPI) => {
    try {
      const access_token = thunkAPI.getState().user.user.data.jwt[0].token;
      // console.log(access_token)
      const response = await axios.post(`${BASE_URL}cart`, data, {
        // data:data,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      });
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.cart_error = false;
      state.cart_success = false;
      state.cart_loading = false;
      state.cart_message = null;
      state.cart_add_sucess = false;
    },
    resetError: (state, ation) => {
      state.cart_error = false;
      state.cart_message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allCart.fulfilled, (state, action) => {
        state.cart_success = true;
        state.cart_error = false;
        state.cart_message = null;
        state.cart_loading = false;
        state.cart = action.payload.data;
      })
      .addCase(allCart.rejected, (state, action) => {
        state.cart_success = false;
        state.cart_message = action.payload;
        state.cart_error = true;
        state.cart_loading = false;
      })
      .addCase(allCart.pending, (state, action) => {
        state.cart_loading = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.cart_add_sucess = true;
        state.cart_error = false;
        state.cart_message = null;
        state.cart_loading = false;
        state.cart = action.payload.data;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.cart_add_sucess = false;
        state.cart_message = action.payload;
        state.cart_error = true;
        state.cart_loading = false;
      })
      .addCase(addCart.pending, (state, action) => {
        state.cart_loading = true;
      });
  },
});

export const { reset, resetError } = cartSlice.actions;
export default cartSlice.reducer;
