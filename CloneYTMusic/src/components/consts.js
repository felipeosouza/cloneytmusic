import { Dimensions, StatusBar } from "react-native";

const height = Dimensions.get('window').height
const headerTopHeight = height * 0.045 + StatusBar.currentHeight
const headerBottomHeight = height * 0.1415
const headerHeight = height * 0.171 + StatusBar.currentHeight

export { headerBottomHeight, headerTopHeight, headerHeight };
