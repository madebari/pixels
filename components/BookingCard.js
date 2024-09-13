import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { formatDate, returnFormat, returnItem } from '../constants';
import { router } from 'expo-router';

export default function BookingCard({order, pay=false}) {
    const [result, setResult] = React.useState(null)
    const [data, setData] = React.useState(null)
    const { events } = useSelector((state) => state.events);
    const { medias } = useSelector((state) => state.medias);
    
React.useEffect(()=>{
if(events){
const event = returnItem(events, order?.acf?.event);
   setData(event)
}
},[events, order])

React.useEffect(()=>{
if(data){
const media = returnItem(medias, data[0]?.featured_media);
   setResult(media)
}
},[data, medias])

  return (
    <View className="flex bg-slate-100 py-3 px-2 rounded-lg my-2 shadow-sm">
      <View className="flex-row items-start space-x-3">
        {result?.length > 0 && <View className="w-40 h-32">
            <Image 
            source={{ uri: result[0]?.media_details?.sizes?.full?.source_url }} 
            className="w-full h-full rounded-xl" />
        </View>}
        {data?.length > 0 && <View className="flex-1">
            <View className="py-2">
                <Text className="text-[18px] text-slate-800 font-regular capitalize">{data[0]?.title?.rendered}</Text>
            </View>
       <View>
         <Text className="text-[16px] text-slate-700 font-light capitalize">{formatDate(data[0]?.acf?.start_date)}</Text>
        <Text className="text-[18px] text-slate-700 font-light capitalize">{data[0]?.acf?.location}</Text>
       </View>
        </View>}
      </View>
      <View>
        {pay ? (
          <TouchableOpacity
          onPress={() => {
            router.push({ pathname: "/home/ticket", params: { id: data[0]?.id } });
          }}
          className="py-3 my-3 px-3 rounded-full bg-slate-800 items-center justify-center">
<Text className="text-white capitalize font-regular text-[16px]">Buy Ticket</Text>
        </TouchableOpacity>
        ) : (
          <TouchableOpacity 
          onPress={() => {
            router.push({ 
              pathname: "/(tabs)/bookings/electronicticket", 
              params: { id: data[0]?.id, route: "/(tabs)/bookings/" } 
          });
          }}
          className="py-3 my-3 px-3 rounded-full bg-slate-800 items-center justify-center">
<Text className="text-white capitalize font-regular text-[16px]">View E-Ticket</Text>
        </TouchableOpacity>
        )}
        
      </View>
    </View>
  )
}