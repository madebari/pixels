import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function Categories({ categories }) {
  return (
    <View className="px-4 mb-4">
      <Text className="text-[20px] text-slate-800 font-regular pb-3">
        Categories
      </Text>
      <View className="py-3 ">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.length > 0 ? (
            <>
              <View className="flex-row space-x-4 items-center justify-center">
                {categories?.map((item) => {
                  if (item?.name.toLowerCase() === "shop") {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          router.push({
                            pathname: "/home/event",
                            params: { cat: item?.id, tpe: null, shop: "shop" },
                          });
                        }}
                        key={item?.id}
                        className="items-center justify-center px-5 py-2 bg-slate-800 rounded-2xl"
                      >
                        <Text className="text-white uppercase font-light text-[10px]">
                          {item?.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          router.push({
                            pathname: "/home/event",
                            params: { cat: item?.id, tpe: null, shop: null },
                          });
                        }}
                        key={item?.id}
                        className="items-center justify-center px-5 py-2 bg-slate-800 rounded-2xl"
                      >
                        <Text className="text-white uppercase font-light text-[10px]">
                          {item?.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>
            </>
          ) : (
            <>
              <View className="py-4 ">
                <Text className="font-bold text-[20px]">No Catgories</Text>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
