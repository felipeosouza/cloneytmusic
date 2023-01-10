import { Dimensions, StatusBar } from "react-native";

const height = Dimensions.get('window').height
const headerTopHeight = height * 0.045 + StatusBar.currentHeight
const headerBottomHeight = height * 0.1415
const headerHeight = height * 0.171 + StatusBar.currentHeight
const titleTextStyle = {
    fontFamily : 'Cairo-Bold',
    letterSpacing : -1.7
}

export {
    headerBottomHeight,
    headerTopHeight,
    headerHeight,
    titleTextStyle
};
