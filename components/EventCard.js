import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { formatDate, returnItem } from "../constants";
export default function EventCard({ item, to }) {
  const { medias } = useSelector((state) => state.medias);
  const media = returnItem(medias, item?.featured_media);
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({ pathname: to, params: { id: item?.id } });
      }}
      className="bg-slate-100 h-[400px] space-x-3  px-2 py-3 mb-2 rounded-2xl"
    >
      <View className="w-[100%]  h-[70%]">
        <Image
          className="h-[100%] w-[100%] cover-fill rounded-2xl"
          source={{ uri: media[0]?.media_details?.sizes?.full?.source_url }}
        />
      </View>
      <View className="w-[100%] h-[30%] py-4 items-start">
        <View>
          <Text
            numberOfLines={1}
            className="text-[24px] text-slate-800 py-3 font-regular"
          >
            {item?.title?.rendered}
          </Text>
        </View>
        <View>
          <Text
            numberOfLines={1}
            className="text-slate-700 px-4 text-[18px]  capitalize font-light"
          >
            {item?.acf?.location} {formatDate(item?.acf?.start_date)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
