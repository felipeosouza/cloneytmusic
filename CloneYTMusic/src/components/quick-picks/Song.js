import React from 'react'
import { Image, View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
export default ({songCover, songName, artist}) => {
    const width = Dimensions.get('window').width
    const styles = StyleSheet.create({
        container : {
            justifyContent : 'space-between',
            alignItems : 'center',
            height : '25%',
            width : width * 0.885,
            flexDirection : 'row',
        },
        more : {
            resizeMode : 'contain',
            tintColor : 'white',
            height : '30%',
            width : '5%',
            marginRight : width * 0.04
        }

    })
    return (
        <View style = {styles.container}>
            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                <Image
                    style={{
                        height : '75%',
                        aspectRatio : 1,
                        borderRadius : width / 200,
                        marginLeft : width * 0.07
                    }}
                    source={{
                        uri: songCover
                    }}
                />
                <View style={{width : '63%', flexDirection : 'column', marginLeft : width * 0.04}}>
                    <Text numberOfLines={2} style={{fontWeight : '600', color : 'white'}}>{songName}</Text>
                    <Text numberOfLines={1} style={{fontWeight : '400', color : '#8F8F8F'}}>{artist}</Text>
                </View>
            </View>
            <Image 
                style={styles.more}
                source={require('../../Images/more-vertical.png')}
            />
        </View>
    )
}