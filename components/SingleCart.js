import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { returnFormat, returnItem } from "../constants";
import { router } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function SingleCart({ order, setTotal, setTotalItem }) {
  const [item, setItem] = React.useState(1);
  const [result, setResult] = React.useState(null);
  const [data, setData] = React.useState(null);
  const { product } = useSelector((state) => state.product);
  const { medias } = useSelector((state) => state.medias);

  React.useEffect(() => {
    if (product) {
      const pd = returnItem(product, order?.acf?.product);
      setData(pd);
    }
  }, [product, order]);

  React.useEffect(() => {
    if (data) {
      const media = returnItem(medias, data[0]?.featured_media);
      setResult(media);
    }
  }, [data, medias]);

  React.useEffect(() => {
    if (data) {
      setTotal((prev) => prev + data[0]?.acf?.cost);
    }
  }, [data]);

  return (
    <View className="flex bg-slate-100 py-3 px-2 rounded-lg my-2 shadow-sm">
      <View className="flex-row items-start space-x-3">
        {result?.length > 0 && (
          <View className="w-40 h-32">
            <Image
              source={{
                uri: result[0]?.media_details?.sizes?.full?.source_url,
              }}
              className="w-full h-full rounded-xl"
            />
          </View>
        )}
        {data?.length > 0 && (
          <View className="flex-1">
            <View className="py-2">
              <Text className="text-[18px] text-slate-800 font-regular capitalize">
                {data[0]?.title?.rendered}
              </Text>
              <Text>TZS {returnFormat(data[0]?.acf?.cost)}</Text>
            </View>

            {/* Add Button */}

            <View className="flex-row bg-white space-x-2 items-center justify-center shadow-lg rounded-full ">
              <TouchableOpacity
                onPress={() => {
                  setItem((txt) => (Number(txt) > 1 ? txt - 1 : txt));
                  setTotalItem((txt) => (Number(txt) > 1 ? txt - 1 : txt));
                }}
                className="rounded-full items-center justify-center w-8 h-8"
              >
                <AntDesign name="minus" size={18} color="black" />
              </TouchableOpacity>

              <Text className="text-[16px] font-light">{item}</Text>

              <TouchableOpacity
                onPress={() => {
                  setItem((txt) => txt + 1);
                  setTotalItem((txt) => Number(txt) + 1);
                }}
                className="rounded-full items-center justify-center w-8 h-8"
              >
                <Ionicons name="add" size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* PAY BUTTON */}
      <View>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/pay",
              params: { route: "/(tabs)/home/cart" },
            })
          }
          className="py-3 my-4 px-3 shadow-lg  rounded-full bg-slate-800 items-center justify-center"
        >
          <Text className="text-slate-300 capitalize font-regular text-[18px]">
            Proceed to checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
