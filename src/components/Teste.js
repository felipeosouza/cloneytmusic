import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default props => {
    return (
        <View style = {{flexDirection : 'row', justifyContent : 'center', alignItems : 'baseline'}}>
        <Text style = {{fontSize : 21}}>
            A
        </Text>
        <View style = {{height : 30, width : 30, backgroundColor : 'red'}}>

        </View>
        </View>
    )
}