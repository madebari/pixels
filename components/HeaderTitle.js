const { Image } = require('react-native');
import img from "../assets/images/PAKUA 2b-01.png"

export default function HeaderTitle() {
  return (
    <Image
      style={{ width: 50, height: 35 }}
      source={img}
    />
  );
}
