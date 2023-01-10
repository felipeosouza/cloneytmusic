import React from 'react'
import { Image, View, Text, StyleSheet, Dimensions, TouchableNativeFeedback } from 'react-native'
import Explicit from '../Explicit'
export default ({ songCover, songName, artist, label }) => {
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    const styles = StyleSheet.create({
        container: {
            height: '90%',
            aspectRatio: 1 / 1.6,
            marginLeft: width * 0.038
        },

    })
    return (
        <View style = {styles.container}>
                <View style={{width : '100%', aspectRatio : 1}}>
                    <Image
                        style={{
                            flex : 1,
                            borderRadius : 4,
                            height : undefined,
                            width : undefined
                        }}
                        resizeMode={'cover'}
                        source={{
                            uri: songCover
                        }}
                    />
                   <TouchableNativeFeedback
                        background={
                            TouchableNativeFeedback.Ripple('#D3D3D3', false)
                        }
                    >
                        <View style={{height : '100%', width : '100%', position : 'absolute', justifyContent : 'center', alignItems : 'center'}}>
                            <Image
                                source={require('../../Images/triangle_icon.png')}
                                resizeMode={'contain'}
                                style={{
                                    height : '20%',
                                    tintColor : 'white',
                                    transform : [{
                                        rotateZ : '90deg',
                                    }]
                                }}
                            />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            <View style={{width : '100%', flexDirection : 'column'}}>
                <Text numberOfLines={2} style={{fontSize : width * 0.033, marginTop : '5%', fontWeight : '600', color : 'white'}}>{songName}</Text>
                <Text numberOfLines={2}>
                    <View>
                        <Explicit label={label}/>
                    </View>
                    <Text numberOfLines={2} style={{fontWeight : '400', color : '#8F8F8F'}}>{artist}</Text>
                </Text>
            </View>
        </View >
    )
}