import React, { useRef } from 'react'
import { Animated, View, Text, StyleSheet, Dimensions, PanResponder } from 'react-native'
export default props => {
    const height = Dimensions.get('window').height
    const miniPlayerY = height * 0.9
    const moveYListener = useRef(miniPlayerY)
    const moveY = useRef(new Animated.Value(miniPlayerY)).current
    moveY.addListener((event) => {
        moveYListener.current = event.value 
    })
    const animateY = Animated
        .diffClamp(moveY, 0, miniPlayerY)
        .interpolate({
            inputRange : [0, 1],
            outputRange : [0, 1],
        })

    const translate = (action) => {
        var value = 0

        switch (action) {
            case 'up' : 
                value = moveYListener.current - miniPlayerY
                //yBeforeTouch.current = 0
            break
            case 'down' :
                value = moveYListener.current + miniPlayerY
                //yBeforeTouch.current = miniPlayerY
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
                const currentVy = gestureState.vy
                //moveY.setValue(moveYListener.current + currentVy * 10)
            },
            onPanResponderMove : (e, gestureState) => {
                const currentVy = gestureState.vy
                moveY.setOffset(gestureState.dy)
                //moveY.setValue(moveYListener.current + currentVy * 10)
            },
            onPanResponderRelease : (e, gestureState) => {
                const yVelocity = gestureState.vy
                const translateY = () => {
                    if(yVelocity < 0){
                        translate('up')
                    } else {
                        translate('down')
                    }
                }

                const goBack = () => {
                    moveYListener.current > -0.4? translate('up') : translate('down')
                }
                
                moveY.flattenOffset()
                Math.abs(yVelocity) > 0.02? translateY() : goBack()
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