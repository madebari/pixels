// import { View, Text } from 'react-native'
import React from 'react'
// import { router } from 'expo-router'
import { useDispatch } from 'react-redux'
import { allEvents } from '../redux/events/EventSlice'
import { allmedia } from '../redux/media/mediaSlice'
import { allorganizer } from '../redux/organizer/organizerSlice'
import { allvenue } from '../redux/venue/venueSlice'
import { allEventcategory } from '../redux/eventCategory/eventCategory'
import { allEventtype } from '../redux/eventType/eventType'
import { CustomLoading } from '../components'
import { allproduct } from '../redux/product/ProductSlice'
import { allproductcategory } from '../redux/productcategory/ProductCatgorySlice'
import { saveUser } from '../redux/auth/authSlice'
import { allOrders } from '../redux/order/orderSlice'
import { allCart } from '../redux/cart/cartSlice'
import { getValueFor } from '../constants'

export default function Loading() {
const [user, setUser] = React.useState(null)
  const dispatch = useDispatch()

  React.useEffect(()=>{
    dispatch(allEvents())
    dispatch(allmedia())
    dispatch(allorganizer())
    dispatch(allvenue())
    dispatch(allEventcategory())
    dispatch(allEventtype())
    dispatch(allproduct())
    dispatch(allproductcategory())
    dispatch(allOrders())
    dispatch(allCart())
  },[])

  React.useEffect(()=>{
  checkUserExisted()
  },[])

  React.useEffect(()=>{
    if(user){
      dispatch(saveUser(user))
    }
  },[user])

  function checkUserExisted(){
    getValueFor('user', setUser);
  }
  // console.log('user', user)

  return (
    <>
    <CustomLoading />
    </>
  )
}