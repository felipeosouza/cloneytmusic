import React, { useRef } from 'react'
import { Animated, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

export default React.forwardRef((props, ref) => {
    const animateColor = useRef(new Animated.Value(0)).current
    React.useImperativeHandle(ref, () => {
        return {
            glow() {
                Animated.sequence([
                    Animated.timing(animateColor, {
                        toValue : 1,
                        duration : 300,
                        useNativeDriver : false
                    }),
                    Animated.timing(animateColor, {
                        toValue : 0,
                        duration : 300,
                        useNativeDriver : false
                    })
                ]).start()
            }
        }
      }
    )

    const text = props.text
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
    const styles = StyleSheet.create({
        button : {
            backgroundColor : 'rgba(113, 113, 113, 0.4)',
            justifyContent : 'center',
            alignItems : 'center',
            height : '58%',
            borderRadius : 10,
            borderColor : 'rgba(167, 167, 167, 0.4)',
            paddingRight : width * 0.048,
            paddingLeft : width * 0.048,
            borderWidth : width * 0.002,
            marginLeft : width * 0.01,
            marginRight : width * 0.01
        },
        whiteOpacity : {
            alignSelf : 'center',
            height : '58%',
            width : '93%',
            borderRadius : 10,
            backgroundColor : 'white',
            opacity : animateColor.interpolate({
                inputRange : [0, 1],
                outputRange : [0, 0.4],
            }),
            position : 'absolute'
        },
        txtContainer : {
            height : '60%',
            justifyContent : 'center',
            alignItems : 'center'
        }
    })
    
    return (
        <TouchableOpacity style={{alignItems : 'flex-start'}} activeOpacity={1}>
            <Animated.View style={styles.whiteOpacity}/>
            <View style={styles.button}>
                <View style={styles.txtContainer}>
                    <Text style={{fontSize : height * 0.023, fontWeight : '600', color : 'white'}}>{text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
})