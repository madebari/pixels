import { WebView } from 'react-native-webview';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { returnItem, num, formatDate } from "../constants";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import RenderHTML from "react-native-render-html";
import { router } from "expo-router";

export default function SingleEventDetails({
  data,
  venue,
  organizer,
  eventtype,
  eventcategory,
  medias,
}) {
  // console.log(data?.title?.rendered)
  const media = returnItem(medias, data?.featured_media);
  const new_organizer = returnItem(organizer, data?.acf?.organizer[0]);
  const html = data?.content?.rendered;

  const { width } = useWindowDimensions();
  // console.log(media)
  return (
    <View className="px-4 py-3 flex-1">
      <View className="h-[850px] rounded-xl w-[99%] self-center px-4 py-4  bg-slate-100">
        <Image
          className="h-[40%] w-full cover-fill rounded-xl"
          source={{ uri: media[0]?.media_details?.sizes?.full?.source_url }}
        />
        <View>
          <Text className="text-[24px] py-6 font-regular">
            {data?.title?.rendered}
          </Text>
        </View>

        <View className="bg-white px-2 py-3 rounded-xl">
          {/* Event Time */}
          <View className="flex-row py-6 border-b-2  space-x-2">
            <View className="bg-slate-200  h-10 w-10 rounded-full items-center justify-center">
              <AntDesign name="calendar" size={24} color="black" />
            </View>
            <View className="flex-1 space-y-2 pr-4">
              <View>
                <Text className="text-black text-[18px] font-regular">
                {formatDate(data?.acf?.start_date)}
              </Text>
              </View>
              <View>
                <TouchableOpacity className="bg-slate-800 py-3 px-2 rounded-full items-center justify-center">
                <Text className="text-gray-300 capitalize font-regular">
                  Add to caleder
                </Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Event Location */}
          <View className="flex-row space-x-2 py-6">
            <View className="bg-slate-200 h-10 w-10 rounded-full items-center justify-center">
              <Feather name="map-pin" size={24} color="black" />
            </View>
            <View className="flex-1 space-y-2">
              <View>
                <Text className="text-slate-800 text-[18px] capitalize font-regular">
                {data?.acf?.location}
              </Text>
              </View>
              <TouchableOpacity className="bg-slate-800 py-3 px-3 rounded-full items-center justify-center">
                <Text className="text-gray-300 capitalize font-regular">
                  See on map
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Organizer */}

        <View className="flex-row space-x-3 bg-white my-4 px-2 py-3 rounded-xl">
          <View className="bg-slate-200 h-10 w-10 rounded-full items-center justify-center">
            <SimpleLineIcons name="organization" size={24} color="black" />
          </View>
          <View className="flex-1 space-y-1">
            <Text className="text-black text-[18px] font-regular">
              Organizer
            </Text>
           <View>
             <Text className="text-black text-[18px] font-light">
              {new_organizer[0]?.title?.rendered}
            </Text>
           </View>
          </View>
        </View>
      </View>

      <View className="pt-6 px-4 mt-4">
        <Text className="text-[24px] font-bold">About this Event</Text>
        <View className="flex-1">
          {/* RENDER HTML */}
          <RenderHTML contentWidth={width} source={{ html }} />
          {/* <WebView
      style={{
        flex:1
      }}
      source={{ uri: html }}
    /> */}
        </View>
      </View>

      <View className="py-2 px-4 items-center justify-center">
        <TouchableOpacity
          onPress={() => {
            router.push({ pathname: "/home/ticket", params: { id: data?.id } });
          }}
          className="bg-slate-800 w-full py-5 px-3 rounded-xl items-center justify-center"
        >
          <Text className="text-gray-300 text-[19px] capitalize font-regular">
            Buy Ticket
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
