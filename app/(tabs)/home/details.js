import { View, Text, ScrollView } from 'react-native'
import React from 'react';
import { Stack, Tabs, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { SingleEventDetails } from '../../../components';

export default function singleevent() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const params = useLocalSearchParams();
  const { id } = params;

  const {event_loading, 
    event_success,events, event_error, 
    event_message} = useSelector(state=>state.events)
    
    const {organizer} = useSelector(state=>state.organizer)

    const {venue} = useSelector(state=>state.venue)

    const {medias} = useSelector(state=>state.medias)

    const {eventtype} = useSelector(state=>state.eventtype)
    // console.log(eventtype)

    const {eventcategory} = useSelector(state=>state.eventcategory)

   
  // console.log(id)

  React.useEffect(()=>{
    if(id){
     const new_data = events?.filter(item=>{
      if(item?.id == id){
        setData(item)
        setLoading(false)
      }
     })
    }
  },[id])
  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    className="bg-white">
      <Stack.Screen options={{
      title:'Event Details',
    //   headerBackTitle: ''
    headerBackTitleVisible: false,
    headerTintColor: '#1e293b'
      }} />
      <SingleEventDetails 
      data={data} 
      venue={venue}
       organizer={organizer} 
       eventtype={eventtype} 
       eventcategory={eventcategory}
        medias={medias}
      />
    </ScrollView>
  )
}