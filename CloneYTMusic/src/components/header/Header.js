import React, { Children, useEffect, useRef } from 'react'
import { Animated, Dimensions, Image, View, Text, StyleSheet, ScrollView, StatusBar  } from 'react-native'
import { headerBottomHeight, headerHeight, hidableHeight } from '../consts'
import Song from '../quick-picks/Song'
import HeaderBottomBox from './HeaderBottomBox'

export default ({scrollDistance}) => {
    const hidableHeight = headerHeight * 0.368
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
    const grow = useRef(true)
    const opacityDiffClamp = scrollDistance
    const yAxis = scrollDistance
    const animatedBorderWidth = useRef(new Animated.Value(0)).current
    
    const animateY = Animated
        .diffClamp(yAxis, 0, hidableHeight)
        .interpolate({
            inputRange : [0, hidableHeight],
            outputRange : [0, -hidableHeight]
        })
    const animateOpacity = Animated
        .diffClamp(opacityDiffClamp, 0, headerHeight * 0.3)
        .interpolate({
            inputRange : [0, headerHeight * 0.3],
            outputRange : [1, 0]
    })
    
    const iconHeight = headerHeight * 0.16
    const ytlogoheight = headerHeight * 0.155
    const margin = width * 0.03
    
    const styles = StyleSheet.create({
        header : {
            height : headerHeight,
            width : '100%',
            paddingTop : StatusBar.currentHeight + height * 0.016,
            justifyContent : 'space-between',
            backgroundColor : scrollDistance.interpolate({
                inputRange : [hidableHeight * 0.8, hidableHeight],
                outputRange : ['transparent', 'black'], 
                extrapolate : 'clamp'
            }),
            transform : [{
                translateY : animateY
            }],
            borderBottomColor : scrollDistance.interpolate({
                inputRange : [0, hidableHeight],
                outputRange : ['rgba(163, 163, 163, 0.4)', 'rgba(59, 59, 59, 0.6)'], 
                extrapolate : 'clamp'
            }),
            // borderBottomColor : '#3B3B3B',
            // borderBottomColor : 'white',
            borderBottomWidth : animatedBorderWidth,
        },
        opacityView : {
            flexDirection : 'row',
            justifyContent : 'space-between',
            alignItems : 'center',
            paddingLeft : width * 0.02,
            paddingRight : width * 0.02,
            opacity : animateOpacity
        },
        icons : {
            tintColor : 'white',
            height : iconHeight,
            width : iconHeight,
            marginRight : margin,
            marginLeft : margin
        },
        profile : { 
            backgroundColor : 'green',
            borderRadius : 100,
            height : iconHeight,
            width : iconHeight, 
            justifyContent : 'center',
            alignItems : 'center',
            marginRight : margin,
            marginLeft : margin
        },
        logoContainer : {
            flexDirection : 'row',
            alignItems : 'center',
            height : 7 * headerHeight * 0.03,
            width : 20.2 * headerHeight * 0.03
        },
        ytlogo : {
            flex : 1,
            marginLeft : margin
        }
    })
    // ANIMATIONS
    const opacityRefs = useRef([])
    useEffect(() => {
        const glow = (idx) => opacityRefs.current[idx].glow()
        for(let c = 0; c < opacityRefs.current.length ; c++) {
            setTimeout(() => {
                glow(c)
             }, c * 80 + 1000)
        }
    }, [])

    const changeBorder = (value) => {
        Animated.timing(animatedBorderWidth, {
            toValue : value,
            duration : 200,
            useNativeDriver : false,
        }).start()
    }

    yAxis.addListener((event) => {
        const y = event.value
        
        if(y >= hidableHeight && grow.current == true){
            changeBorder(0.7)
            grow.current = false
        } else if(y == 0){
            changeBorder(0)
            grow.current = true
        }
    })

    
    //COMPONENTS
    const YtLogo = () => {
    return (
        <View style={styles.logoContainer}>
            <Image 
                style={styles.ytlogo}
                resizeMode={'contain'}
                source={require('../../Images/YouTube-Music.webp')}
            />
        </View>
    )}
    const Buttons = () => {
    return (
        <View style={{flexDirection : 'row', height : '100%', alignSelf : 'flex-end', justifyContent : 'center', alignItems : 'center'}}>
            <Image style={styles.icons}
                source={require('../../Images/cast.png')}
            />
            <Image style={styles.icons}
                source={require('../../Images/search.png')}
            />
            <View style={styles.profile}>
                <Text style={{color : 'white', fontSize : hidableHeight * 0.2, fontWeight : '400'}}>F</Text>
            </View>
        </View>
    )}

    return (
        <>
            <Animated.View style = {styles.header}>
                <Animated.View style={styles.opacityView}>
                    <YtLogo/>
                    <Buttons/>
                </Animated.View>
                <View style={{height : '62%'}}>
                    <ScrollView contentContainerStyle={{alignItems : 'center', paddingLeft : width * 0.04, paddingRight : width * 0.04}} horizontal>
                        <HeaderBottomBox ref={ el => opacityRefs.current[0] = el } text={'Workout'}/>
                        <HeaderBottomBox ref={ el => opacityRefs.current[1] = el } text={'Relax'}/>
                        <HeaderBottomBox ref={ el => opacityRefs.current[2] = el } text={'Commute'}/>
                        <HeaderBottomBox ref={ el => opacityRefs.current[3] = el } text={'Energize'}/>
                        <HeaderBottomBox ref={ el => opacityRefs.current[4] = el } text={'Focus'}/>
                    </ScrollView>
                </View>
            </Animated.View>
        </>
    )
}