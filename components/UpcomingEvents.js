import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { formatDate, getADay, getAWeak, returnItem } from "../constants";
import { router } from "expo-router";

export default function UpcomingEvents({
  title,
  data,
  medias,
  to,
  tpe,
  id = null,
}) {
  const [showed, setShowed] = React.useState(data);

  const aweek = getAWeak();
  const values = Object.values(aweek);
  // console.log(aweek)

  const aday = getADay();

  const dayvalue = Object.values(aday);
  // console.log(dayvalue)

  React.useEffect(() => {
    if (id) {
      const new_data = data?.filter((item) => {
        if (item?.event_category == id) {
          const str = formatDate(item?.acf?.start_date);
          const myArray = str.split(" ");
          let new_dt =
            myArray[0] +" " + myArray[1] +" " + myArray[2] +" " + myArray[3];
          if (dayvalue[0]?.toString().includes(new_dt.toString())) {
            return null;
          } else {
            return item;
          }
        }
      });
      if (new_data) {
        setShowed(new_data);
      }
    } else if (tpe.toLocaleLowerCase() == "upcoming".toLocaleLowerCase()) {
      const new_data = data?.filter((item) => {
        const str = formatDate(item?.acf?.start_date);
        const myArray = str.split(" ");
        let new_dt =
          myArray[0]+" "+myArray[1]+" " +myArray[2]+" "+myArray[3];
        if(dayvalue[0]?.toString().includes(new_dt.toString())) {
          return item;
        }else{
          return null;
        }
      });
      

      if (new_data?.length > 0) {
        setShowed(new_data);
        // setLoading(false)
      }
    } else if (tpe.toLocaleLowerCase() == "this_week".toLocaleLowerCase()) {
      const new_data = data?.filter((item) => {
        const str = formatDate(item?.acf?.start_date);
        const myArray = str.split(" ");
        let new_dt =
          myArray[0] + " " + myArray[1] + " " + myArray[2] + " " + myArray[3];
        for (let index = 0; index < values.length; index++) {
          if (values[index]?.toString().includes(new_dt.toString())) {
            if (dayvalue[0]?.toString().includes(new_dt.toString())) {
              return null;
            } else {
              return item;
            }
          }
        }
      });

      if (new_data?.length > 0) {
        setShowed(new_data);
        // setLoading(false)
      }
    }
  }, [id, data, tpe]);
  return (
    <>
      {showed.length > 0 ? (
        <View className="mb-4 pl-4 pt-5">
          <View className="flex-row justify-between pr-4 items-ceter">
            <Text className="text-[18px] font-regular text-slate-800 pb-3">
              {title}
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: to,
                  params: { cat: id, tpe, shop: null },
                });
              }}
            >
              <Text className="text-slate-800 text-[14px] font-light">
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View className="py-3">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <>
                <View className="flex-row space-x-2 items-center justify-center">
                  {showed?.map((item) => {
                    const media = returnItem(medias, item?.featured_media);
                    //  console.log(item?.acf?.start_date)
                    return (
                      <TouchableOpacity
                        key={item?.id}
                        onPress={() => {
                          router.push({
                            pathname: "/home/details",
                            params: { id: item?.id, shop: null },
                          });
                        }}
                        className="h-[300px] w-[200px]"
                      >
                        <Image
                          className="w-[100%] bg-white h-[60%] cover-fill rounded-2xl"
                          source={{
                            uri: media[0]?.media_details?.sizes?.full
                              ?.source_url,
                          }}
                        />
                        <View className="pt-2 px-1">
                          <Text className=" text-[18px] font-regular">
                          {item?.title?.rendered}
                        </Text>
                        </View>
                        <View className="pb-1">
                          <Text className="text-slate-500 pt-1 px-1 text-[15px] font-light">
                          {formatDate(item?.acf?.start_date)}
                        </Text>
                        <Text className="text-slate-500 capitalize pt-1 px-1 text-[15px] font-light">
                          {item?.acf?.location}
                        </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            </ScrollView>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
