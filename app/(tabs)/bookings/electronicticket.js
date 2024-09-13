import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Stack, useLocalSearchParams } from "expo-router";
import { formatDate, returnItem } from "../../../constants";
import Entypo from "@expo/vector-icons/Entypo";
import QRCode from "react-native-qrcode-svg";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';





export default function bookingdetails() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const params = useLocalSearchParams();
  const { id } = params;


  const [selectedPrinter, setSelectedPrinter] = React.useState();




  const { event_loading, event_success, events, event_error, event_message } =
    useSelector((state) => state.events);

  const { organizer } = useSelector((state) => state.organizer);

  const { user } = useSelector((state) => state.user);

  const { venue } = useSelector((state) => state.venue);

  const { medias } = useSelector((state) => state.medias);

  const { eventtype } = useSelector((state) => state.eventtype);
  // console.log(eventtype)

  const { eventcategory } = useSelector((state) => state.eventcategory);
  // console.log(id)
  React.useEffect(() => {
    if (id) {
      const new_data = events?.filter((item) => {
        if (item?.id == id) {
          setData(item);
          setLoading(false);
        }
      });
    }
  }, [id]);

  const media = returnItem(medias, data?.featured_media);
  const ven = returnItem(venue, data?.acf?.venue);


  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body style="text-align: center;">
        <div class="flex-1">
         <div class="bg-slate-800 py-6 px-6 rounded-xl">
          <div class="flex-row justify-center items-center">
            <div classe="h-[100px] w-[100px] mr-3 rounded-xl">
              <img src=${media[0]?.media_details?.sizes?.full?.source_url}
                class="w-full h-full rounded-xl"
              />
            </div>

            <div class="flex-1">
              <h1 class="text-slate-200 text-[24px] capitalize font-regular">
                ${data?.title?.rendered}
              </h1>
            </div>
          </div>

        
          <div class="py-4">
            <h1 class="text-slate-200 mb-2 text-[20px] capitalize font-regular">
              Venue
            </h1>
            <h1 class="text-slate-200 text-[14px] capitalize font-light">
              ${ven[0]?.title?.rendered}
            </h1>
          </div>

        
          <div class="py-4">
            <h1 class="text-slate-200 mb-2 text-[20px] capitalize font-regular">
              Name
            </h1>
            <h1 class="text-slate-200 text-[14px] capitalize font-light">
              ${user?.data?.user?.display_name}
            </h1>
          </div>

          

          <div class="py-4">
            <h1 class="text-slate-200 mb-2 text-[20px] capitalize font-regular">
              Date
            </h1>
            <h1 class="text-slate-200 text-[14px] uppercase font-light">
              ${formatDate(data?.acf?.start_date)}
            </h1>
          </div>
        </div>

        <div>
          <div class="p-4 items-center">
            <QRCode value="8998hujbb 9898uhhbhh998iuhbh98uhu8778uybhvh" />
          </div>

          </div>
         </div>
    
  </body>
</html>
`;

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };
  // console.log(user)
  return (
    <View className="flex-1 px-4 py-6 bg-white">
      <Stack.Screen
        options={{
          title: "E-Ticket",
          //   headerBackTitle: ''
          headerBackTitleVisible: false,
          headerTintColor: "#1e293b",
        }}
      />
      <ScrollView>
        <View className="bg-slate-800 py-6 px-6 rounded-xl">
          <View className="flex-row justify-center items-center">
            <View className="h-[100px] w-[100px] mr-3 rounded-xl">
              <Image
                className="w-full h-full rounded-xl"
                source={{
                  uri: media[0]?.media_details?.sizes?.full?.source_url,
                }}
              />
            </View>

            <View className="flex-1">
              <Text className="text-slate-200 text-[24px] capitalize font-regular">
                {data?.title?.rendered}
              </Text>
            </View>
          </View>

          {/* VENUE */}

          <View className="py-4">
            <Text className="text-slate-200 mb-2 text-[20px] capitalize font-regular">
              Venue
            </Text>
            <Text className="text-slate-200 text-[14px] capitalize font-light">
              {ven[0]?.title?.rendered}
            </Text>
          </View>

          {/* USER */}

          <View className="py-4">
            <Text className="text-slate-200 mb-2 text-[20px] capitalize font-regular">
              Name
            </Text>
            <Text className="text-slate-200 text-[14px] capitalize font-light">
              {user?.data?.user?.display_name}
            </Text>
          </View>

          {/* DATE */}

          <View className="py-4">
            <Text className="text-slate-200 mb-2 text-[20px] capitalize font-regular">
              Date
            </Text>
            <Text className="text-slate-200 text-[14px] uppercase font-light">
              {formatDate(data?.acf?.start_date)}
            </Text>
          </View>
        </View>

        <View>
          <View className="p-4 items-center">
            <QRCode value="8998hujbb 9898uhhbhh998iuhbh98uhu8778uybhvh" />
          </View>

          <View className="p-6 items-center">
            <TouchableOpacity
            onPress={printToFile}
            className="py-2 px-6 space-x-2 rounded-lg bg-slate-800 flex-row items-center justify-center">
              <Text className="text-slate-100 font-regular">
                Download Ticket
              </Text>
              <Entypo name="download" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
