import { configureStore } from '@reduxjs/toolkit'
import EventReducer from './events/EventSlice'
import mediaReducer from './media/mediaSlice'
import organizerReducer from './organizer/organizerSlice'
import venueReducer from './venue/venueSlice'
import eventCategoryReducer from './eventCategory/eventCategory'
import eventtypeReducer from './eventType/eventType'
import productReducer from "./product/ProductSlice"
import productcategoryReducer from "./productcategory/ProductCatgorySlice"
import userReducer from "./auth/authSlice"
import orderReducer from "./order/orderSlice"
import cartReducer from "./cart/cartSlice"

export const store = configureStore({
  reducer: {
    events: EventReducer,
    medias: mediaReducer,
    organizer: organizerReducer,
    venue: venueReducer,
    eventcategory: eventCategoryReducer,
    eventtype: eventtypeReducer,
    product: productReducer,
    product_category: productcategoryReducer,
    user: userReducer,
    orders: orderReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})