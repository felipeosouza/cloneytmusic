import React, { Children, useRef } from 'react'
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
                inputRange : [0, hidableHeight],
                outputRange : ['transparent', 'black'], 
                extrapolate : 'clamp'
            }),
            transform : [{
                translateY : animateY
            }],
            borderBottomColor : '#2B2C2C',
            borderBottomWidth : animatedBorderWidth
        },
        opacityView : {
            flexDirection : 'row',
            justifyContent : 'space-between',
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
            alignSelf : 'flex-end',
            marginRight : margin,
            marginLeft : margin
        },
        ytLogoContainer : {
            marginLeft : margin,
            height : ytlogoheight,
            width : ytlogoheight + 2,
        },
        ytlogo : {
            resizeMode : 'stretch',
            height : 5.93 * headerHeight * 0.025,
            width : 6 * headerHeight * 0.025,
            marginLeft : margin,
            marginRight : margin * 0.3,
        },
        ytname : {
            resizeMode : 'stretch',
            tintColor : 'white',
            height : 4.88 * headerHeight * 0.027,
            width : 12.45 * headerHeight * 0.027
        }
    })
    // ANIMATIONS
    const opacityRefs = useRef([])
    const glow = (idx) => opacityRefs.current[idx].glow()

    const changeBorder = (value) => {
        for(let c = 0; c < opacityRefs.current.length ; c++) {
            setTimeout(() => {
                glow(c)
             }, c * 80)
        }

        Animated.timing(animatedBorderWidth, {
            toValue : value,
            duration : 200,
            useNativeDriver : false,
        }).start()
    }

    yAxis.addListener((event) => {
        const y = event.value
        
        if(y >= hidableHeight && grow.current == true){
            changeBorder(0.8)
            grow.current = false
        } else if(y == 0){
            changeBorder(0)
            grow.current = true
        }
    })

    
    //COMPONENTS
    const YtLogo = () => {
    return (
        <View style={{flexDirection : 'row', alignItems : 'center'}}>
            <Image style={styles.ytlogo}
                source={require('../../Images/YouTube-Music-Logo.png')}
            />
            <Image style={styles.ytname}
                source={require('../../Images/YouTube-Music-Name.png')}
            />
        </View>
    )}
    const Buttons = () => {
    return (
        <View style={{flexDirection : 'row', alignSelf : 'flex-end', alignItems : 'center'}}>
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
                        <HeaderBottomBox ref={ el => opacityRefs.current[0] = el }  {...{text : 'Energize'}}/>
                        <HeaderBottomBox ref={ el => opacityRefs.current[1] = el } text={'Relax'}/>
                        <HeaderBottomBox ref={ el => opacityRefs.current[2] = el } text={'Energize'}/>
                        <HeaderBottomBox ref={ el => opacityRefs.current[3] = el } text={'aaaaaaaa'}/>
                        <HeaderBottomBox ref={ el => opacityRefs.current[4] = el } text={'aaaaaaaaaa'}/>
                    </ScrollView>
                </View>
            </Animated.View>
        </>
    )
}