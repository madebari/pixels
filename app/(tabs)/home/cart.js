import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { useSelector } from "react-redux";
import SingleCart from "../../../components/SingleCart";
import { allCart } from "../../../redux/cart/cartSlice";
import { useDispatch } from "react-redux";

export default function cartscreen() {
  const [total, setTotal] = React.useState(0);
  const [totalItem, setTotalItem] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  const [data, setData] = React.useState([])

  const { cart, cart_loading } = useSelector(
    (state) => state.cart
  );

  const {user} = useSelector(state=>state.user);

  React.useEffect(() => {
    if (loading) {
      dispatch(allCart());
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

   React.useEffect(() => {
    if (!cart_loading && cart.length > 0) {
      let new_data = cart?.filter(item=>{
        if(item?.acf?.ispayed == false && item?.acf?.user == user?.data?.user?.ID){
          return item
        }
      })

      if(new_data){
        setData(new_data)
      }
    }
  }, [cart_loading, cart]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-white flex-1"
    >
      <Stack.Screen
        options={{
          title: "Cart",
          //   headerBackTitle: ''
          headerBackTitleVisible: false,
          headerTintColor: "#1e293b",
        }}
      />

     {!user ? (<View className="flex-1 items-center justify-center ">
      <Text className="text-[18px] py-10 text-slate-800 font-regular">Login or Register to view your cart</Text>
     </View>) : <>
     
      {loading ? (
        <View className="flex-1 py-10 items-center justify-center">
          <Text className="text-[24px]  text-slate-800 font-regular">
            Loading..
          </Text>
        </View>
      ) : (
        <View className="flex-1 px-4 py-6">
          {data?.length === 0 ? (
            <View className="flex-1 items-center">
              <Text className="text-[18px] text-slate-600 capitalize font-regular">
                Cart is empty
              </Text>
            </View>
          ) : (
            <View>
              {data?.map((item) => (
                <SingleCart
                  setTotal={setTotal}
                  setTotalItem={setTotalItem}
                  key={item?.id}
                  order={item}
                />
              ))}
            </View>
          )}
        </View>
      )}</>}
    </ScrollView>
  );
}
