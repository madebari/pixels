import { TextInput, View, Text } from "react-native"

export default function Forms({placeholder="Enter Text",passwd=false, item, setItem}) {
  return (
    <View className="w-full border-slate-300 border-2 h-auto bg-slate-200 px-2 py-4 rounded-full mb-2 flex-row items-center justify-items-start">
      <TextInput
      className="w-full h-full placeholder:capitalize placeholder:text-black placeholder:font-bold"
       placeholder={placeholder}
       item={item}
       autoCapitalize='none'
       secureTextEntry={passwd? true : false} // for password field
       onChangeText={txt=>setItem(txt)}
      />
    </View>
  )
}