import { View, Text, ScrollView,
   Dimensions,  
   Image,
   Platform} from 'react-native'
import React from 'react'
import { Link, Stack, Tabs } from 'expo-router'
import { AUTH_KEY, getValueFor } from '../../../constants'
import { useIsFocused } from '@react-navigation/native'
import { 
  Carousels, Search, 
  Categories,UpcomingEvents, Error, 
  Success,
  CustomLoading,
  HeaderTitle
} from '../../../components' 
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

const {width} = Dimensions.get("window").width
import { useSelector, useDispatch } from 'react-redux'
import { allEvents } from '../../../redux/events/EventSlice'
import { allorganizer } from '../../../redux/organizer/organizerSlice'
import { allmedia } from '../../../redux/media/mediaSlice'
import { allvenue } from '../../../redux/venue/venueSlice'
import { allEventcategory } from '../../../redux/eventCategory/eventCategory'
import { allEventtype } from '../../../redux/eventType/eventType'
import {allproductcategory} from "../../../redux/productcategory/ProductCatgorySlice"
import { DrawerActions } from '@react-navigation/native';

import { useNavigation, router } from 'expo-router';
import { allproduct } from '../../../redux/product/ProductSlice'


export default function Home() {
  const [item, setItem] = React.useState(null)
 
  const focused  = useIsFocused()

  const navigation = useNavigation()

  const dispatch = useDispatch()

  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const {event_loading, 
    event_success,events, event_error, 
    event_message} = useSelector(state=>state.events)
    
    const {organizer} = useSelector(state=>state.organizer)

    const {venue} = useSelector(state=>state.venue)

    const {medias} = useSelector(state=>state.medias)

    const {eventtype} = useSelector(state=>state.eventtype)
    // console.log(eventtype)

    const {eventcategory} = useSelector(state=>state.eventcategory)


    React.useEffect(()=>{
          dispatch(allEvents())
          dispatch(allmedia())
          dispatch(allorganizer())
          dispatch(allvenue())
          dispatch(allEventcategory())
          dispatch(allEventtype())
          dispatch(allproduct())
          dispatch(allproductcategory())
    },[focused])

   React.useEffect(()=>{
    getResult();
  },[focused])

    const getResult = () => {
      getValueFor('token', setItem)
      setLoading(false)
    }

    React.useEffect(()=>{
      if(item){

        console.log(item)

        const data = {
          jwt: item,
          AUTH_KEY:AUTH_KEY
        }
        dispatch(validateToken(data));
      }
    },[item])


    React.useEffect(()=>{
       const new_data = events?.map(item=>{
return item
    })

      if(new_data){
        setLoading(false)
        setData(new_data)
      }
     
    },[events])

  const itemW = width * 0.8
  return (
    <>
    <Stack.Screen options={{
      title:'Home',
      headerTintColor: '#1e293b',
      headerTitle: (props) => <HeaderTitle {...props} />,

      headerLeft: (props) => ( <MaterialCommunityIcons
        containerStyle={{}}
        onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
        size={24}
        color="black"
        name="menu"
      />),
    

    headerRight: (props) => (
      <View className="flex-row space-x-3">
        <MaterialIcons
        containerStyle={{}}
        onPress={()=>router.navigate("/(tabs)/home/notifications")}
        size={24}
        color="black"
        name="notifications-none"
      />
      <Ionicons
        containerStyle={{}}
        onPress={()=>router.navigate("/(tabs)/home/cart")}
        size={24}
        color="black"
        name="cart-outline"
      />
      </View>
    )

    }} />
    <ScrollView
    showsVerticalScrollIndicator={false}
    className=" bg-white">
      {loading ? (

        <View className="flex-1 py-40 mx-auto">
        <Text className="text-black font-bold uppercase text-[24px]">LOADING...</Text>
        </View>
      ) : ( <>
      
      {/* Search */}
      {/* <Error />  */}
      {/* <Success /> */}
      {event_error ? (
        <Error />
      ) : <></>}
      <View className="mx-4">
        <Search />
      </View>

      {/* CArousel */}
      <View className='items-center'>
        <Carousels medias={medias} data={data} />
      </View>

      {/* Categories Lists */}
      <Categories categories={eventcategory} />

      {/* Upcoming events */}
      <UpcomingEvents 
      title="Upcomming Events" 
      data={events} 
      medias={medias}
      to={"/home/event"}
      tpe={'upcoming'}
      />

      {/* Next week */}
      <UpcomingEvents 
      title="This Week" 
      data={events} 
      medias={medias}
      to={"/home/event"}
      tpe={'this_week'}
      />

      {/* Music */}
       

      {eventcategory.length > 0 ? (
            <>
            <View>
                {eventcategory.map(item=><UpcomingEvents 
                key={item?.id}
                title={item?.name} 
                data={events} 
                medias={medias}
                id={item?.id}
                to={"/home/event"}
                tpe={null}
      /> )}
            </View>
            </>
        ) : (
            <></>
        )}

      </>)}
    </ScrollView>
    </>
  )
}