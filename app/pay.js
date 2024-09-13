import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  Link,
  router,
  Stack,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { mobiledata } from "../constants";
import { useSelector } from "react-redux";

export default function pay() {
  const params = useLocalSearchParams();
  const { route, event, shop, number_person, number_regular, number_vip } =
    params;

  const { user } = useSelector((state) => state.user);
  // const navigation = useNavigation();
  React.useEffect(() => {
    if (!user) {
      router.push({
        pathname: "/login",
        params: { route: "/(tabs)/home/details" },
      });
    }
  }, [user]);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : ""}
    >
      <Stack.Screen
        options={{
          presentation: "modal",
          title: "Choose Payment System",
          headerBackTitle: "",
          // headerBackTitleVisible: false,
          headerTintColor: "#1e293b",
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
          headerShown: true,
          headerLeft: (props) => (
            <View className="px-4">
              <MaterialCommunityIcons
                containerStyle={{}}
                onPress={() => router.push(route ? route : "/(tabs)/home")}
                size={24}
                color="black"
                name="arrow-left"
              />
            </View>
          ),
        }}
      />
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1  px-4 py-4">
          <View className="py-3 px-4 bg-slate-100 w-[345px] items-center rounded-xl">
            <Text className="text-[24px] text-slate-800 font-bold capitalize">
              Mobile Money
            </Text>
            <View className="flex-row items-center space-x-3 py-4 justify-between">
              {mobiledata.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {}}
                    className="rounded-sm w-24 h-16 items-center justify-center"
                  >
                    <Image
                      source={{
                        uri: item?.uri,
                      }}
                      //   style={{  objectFit:"contain" }}
                      className="rounded-sm w-full h-full"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
