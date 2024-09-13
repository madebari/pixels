import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Stack, useNavigation } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BookingCard } from "../../../components";

export default function bookings() {
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);

  React.useEffect(() => {
    if (orders) {
      const filteredOrders = orders?.filter(
        (order) => Number(order?.acf?.user) === Number(user?.data?.user?.ID)
      );
      // console.log(filteredOrders)
      if (filteredOrders) {
        setResult(filteredOrders);
        setLoading(false);
      }
    }
  }, [orders]);

  const navigation = useNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white"
    >
      <Stack.Screen
        options={{
          title: "Bookings",
          headerTintColor: "#1e293b",
          headerLeft: (props) => (
            <MaterialCommunityIcons
              containerStyle={{}}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              size={24}
              color="black"
              name="menu"
            />
          ),
        }}
      />
      {loading ? (
        <View>
          <Text>Loading ....</Text>
        </View>
      ) : (
        <View className="flex-1 px-4 py-3">
          {/* <Text className="text-[24px] font-bold text-slate-800 capitalize">events</Text> */}

          {result?.length > 0 ? (
            <View>
              {result.map((order, index) => {
                return <BookingCard key={index} pay={false} order={order} />;
              })}
            </View>
          ) : (
            <View className="py-3">
              <Text className="text-[15px] text-slate-800 font-light capitalize">
                No Bookings found
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
