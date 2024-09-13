import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Btn({title="btn", loading, onPress}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} className="bg-black px-5 py-2 rounded-full">
       {loading ? <Text className="text-white capitalize text-[15px] font-regular">Loading...</Text> :  <Text className="text-white capitalize text-[15px] font-regular">{title}</Text>}
      </TouchableOpacity>
    </View>
  )
}