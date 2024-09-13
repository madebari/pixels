import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Search() {
  return (
    <TouchableOpacity 
    onPress={()=>router.push("search")}
    className="py-3 px-3 mt-3 mb-5 flex-row space-x-3 items-center rounded-md border border-gray-300">
        <FontAwesome name="search" size={16} color="gray" />
        <Text className="text-gray-400 font-bold capitalize">Search Events..</Text>
    </TouchableOpacity>
  )
}