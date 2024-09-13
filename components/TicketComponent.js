import { View, Text, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function TicketComponent({title, item, setItem,cost, details}) {
  return (
    <View className="bg-slate-100 mb-3 rounded-lg py-4 px-3 flex-row items-center justify-between">
   <View className="space-y-1">
    <Text className="text-[18px] font-light">{title}</Text>
    <Text className="text-[16px] font-regular">TZS {cost}</Text>
    <Text className="text-[16px] capitalize font-light">{details}</Text>
   </View>

<View className="flex-row space-x-2 items-center justify-center">

    
   <TouchableOpacity
     onPress={()=>setItem(txt=>Number(txt) > 0 ? txt-1 : txt)} 
    
    className="rounded-full items-center justify-center w-8 h-8 bg-black">
       <AntDesign name="minus" size={18} color="white" />
    </TouchableOpacity>

    <Text className="text-[16px] font-light">{item}</Text>

 <TouchableOpacity
     onPress={()=>setItem(txt=>txt+1)}
    className="rounded-full items-center justify-center w-8 h-8 bg-black">
        <Ionicons name="add" size={18} color="white" />
    </TouchableOpacity>
</View>
            </View>
  )
}