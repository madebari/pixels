import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";
import img from "../assets/images/splash.png";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router";

const drawerItems = [
  {
    title: "Home",
    icon: "home",
    navigate: "/(tabs)/home/",
  },
  // {
  //   title: "Search",
  //   icon: "search",
  //   navigate: "/(tabs)/search",
  // },

  {
    title: "Profile",
    icon: "person",
    isSpecial: false,
    navigate: "/(tabs)/profile",
  },
{
    title: "Shop",
    icon: "shop",
    isSpecial: false,
    navigate: "/(tabs)/shop",
  },
  {
    title: "Bookings",
    icon: "book",
    isSpecial: false,
    navigate: "/(tabs)/bookings",
  },
  {
    title: "Cart",
    icon: "store",
    isSpecial: false,
    navigate: "/(tabs)/home/cart",
  },
  {
    title: "Notifications",
    icon: "notifications",
    isSpecial: false,
    navigate: "/(tabs)/home/notifications",
  },
];

export default function CustomDrawerContent(props) {
  const dispatch = useDispatch();

  const [imageItem, setItem] = React.useState(null);

  async function LogOut() {
    // await SecureStore.deleteItemAsync('user_token');
  }

  const closeDrawer = () => {
    const { navigation } = props;
    navigation.closeDrawer();
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={{ marginTop: 10, paddingLeft: 30 }}>
          <TouchableOpacity onPress={() => closeDrawer()}>
            <Icon name="close" color="#1e293b" size={24} />
          </TouchableOpacity>
        </View>
        <View className="flex items-center justify-center py-5 mt-6">
          <TouchableOpacity className="h-[80px] w-[140px]">
            <Image source={img} className="h-full w-full cover-fill" />
          </TouchableOpacity>
        </View>
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {drawerItems?.map((item) => {
            return (
              <DrawerItem
                key={item?.title}
                icon={({ color, size }) => (
                  <Icon name={item?.icon} color={color} size={size} />
                )}
                label={item?.title}
                onPress={() => router.push(item?.navigate)}
              />
            );
          })}
        </ScrollView>
      </DrawerContentScrollView>

      <View className="py-4">
        <Text
          style={{
            padding: 0,
            paddingBottom: 10,
            textAlign: "center",
            fontSize: 14,
          }}
        >
          Pakua App v {Constants.expoConfig.version}
        </Text>
      </View>
    </View>
  );
}
