import React from 'react'
import { Dimensions, View, Image, StatusBar } from 'react-native'
export default props => {
    const height = Dimensions.get('window').height
    return (
        <View style={{height : '100%', width : '100%', backgroundColor : 'black', justifyContent : 'center', alignItems : 'center', paddingTop : height * 0.08}}>
            <StatusBar backgroundColor={'transparent'} translucent />
            <Image 
                source={require('../Images/YouTube-Music-Logo.png')}
                style={{
                    height : height * 0.20,
                    aspectRatio : 6/5.93
                }}
            />
        </View>
    )
}