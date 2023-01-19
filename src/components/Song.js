import React from 'react'
import { Image, View, Text, StyleSheet, Dimensions } from 'react-native'
import Explicit from './Explicit'

export default ({songCover, songName, artist, label}) => {
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    const styles = StyleSheet.create({
        container : {
            justifyContent : 'space-between',
            alignItems : 'center',
            height : height * 0.085,
            width : width * 0.885,
            flexDirection : 'row',
        }
    })
    return (
        <View style = {styles.container}>
            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                <Image
                    style={{
                        backgroundColor : '#7E7E7E',
                        height : '80%',
                        aspectRatio : 1,
                        borderRadius : width / 200,
                        marginLeft : width * 0.07
                    }}
                    source={{
                        uri: songCover
                    }}
                />
                <View style={{width : '63%', flexDirection : 'column', marginLeft : width * 0.04}}>
                    <Text numberOfLines={2} style={{fontSize : width * 0.0365, fontWeight : '600', color : 'white'}}>{songName}</Text>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                        <Explicit label={label} size={height * 0.018}/>
                        <Text numberOfLines={1} style={{fontWeight : '400', color : '#8F8F8F'}}>{artist}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}