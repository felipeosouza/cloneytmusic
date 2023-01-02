import React, { useRef } from 'react'
import { Animated, View, Text, StyleSheet, Dimensions, PanResponder } from 'react-native'
export default props => {
    const height = Dimensions.get('window').height
    const miniPlayerY = height * 0.9
    const yBeforeTouch = useRef(miniPlayerY)
    const moveY = useRef(new Animated.Value(miniPlayerY)).current
    const animateY = Animated
        .diffClamp(moveY, 0, miniPlayerY)
        .interpolate({
            inputRange : [0, 1],
            outputRange : [0, 1],
        })
    const scale = (action) => {
        var value = 0

        switch (action) {
            case 'up' : 
                value = 0
                yBeforeTouch.current = 0
            break
            case 'down' :
                value = miniPlayerY
                yBeforeTouch.current = miniPlayerY
            break
        }

        Animated.timing(moveY, {
            toValue : value,
            duration : 80,
            useNativeDriver : true
        }).start()
    }

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder : () => true,
            onPanResponderGrant : (e, gestureState) => {
                moveY.setOffset(yBeforeTouch.current + gestureState.dy)
            },
            onPanResponderMove : (e, gestureState) => {
                const currentDY = gestureState.dy
                console.log(yBeforeTouch.current, currentDY)
                moveY.setValue(yBeforeTouch.current + currentDY)
            },
            onPanResponderRelease : (e, gestureState) => {
                //yBeforeTouch.current += gestureState.dy
                moveY.flattenOffset()
                gestureState.dy < 0? scale('up') : scale('down')
            }

        })).current

    const styles = StyleSheet.create({
        songScreen : {
            backgroundColor : 'grey',
            height : '100%',
            width : '100%',
            position : 'absolute',
            transform : [{
                translateY : animateY
            }]
        }
    })
    return (
        <Animated.View style = {styles.songScreen} {...panResponder.panHandlers}>
            
        </Animated.View>
    )
}