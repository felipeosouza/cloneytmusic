import React from 'react'
import { Dimensions, View, Text } from 'react-native'
export default ({label, size}) => {
    const height = Dimensions.get('window').height
    const explicitSize = size || height * 0.016

    if(label == 'EXPLICIT'){
        return (
            <View style = {{height : explicitSize, width : explicitSize, backgroundColor : '#B9B9B9', alignItems : 'center', justifyContent : 'center', marginRight : 4}}>
                <Text style={{fontSize : explicitSize * 0.7, color : 'black', fontWeight : '900'}}>E</Text>
            </View>
        )
    }
}