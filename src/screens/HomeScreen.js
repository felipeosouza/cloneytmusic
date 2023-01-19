import React, { useRef } from 'react'
import { Animated, Dimensions, View, StyleSheet, StatusBar } from 'react-native'
import Header from '../components/header/Header'
import { headerBottomHeight, headerHeight } from '../components/consts'
import SongScreen from '../components/SongScreen'
import QuickPicks from '../components/quick-picks/QuickPicks'
import ListenAgain from '../components/listen-again/ListenAgain'
import ForgottenFavorites from '../components/forgotten-favorites/ForgottenFavorites.js'

export default ({navigation}) => {
    const height = Dimensions.get('window').height
    const opacitySection = headerBottomHeight

    const scrollDistance = useRef(new Animated.Value(0)).current
    const scrollY = useRef(null)

    const styles = StyleSheet.create({
        container: {
            height: '100%',
            backgroundColor: 'transparent'
        },
        blackBackground: { 
            height: '100%',
            width: '100%',
            backgroundColor: 'black',
            position: 'absolute'
        },
        scrollView: {
            
        },
        image: {
            backgroundColor: 'black',
            height: headerHeight + height * 0.5,
            width: '100%',
            resizeMode: 'stretch',
            opacity: scrollDistance.interpolate({
                inputRange: [0, opacitySection - height * 0.07],
                outputRange: [1, 0],
                extrapolate: 'clamp'
            })
        },
        absolute: {
            height: '100%',
            width: '100%',
            position: 'absolute',
        }
    })

        return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'transparent'} translucent />
            <View style={styles.absolute}>
                <View style={styles.blackBackground} />
                <Animated.Image style={styles.image}
                    source={
                        require('../Images/background2.jpg')
                    }
                />
            </View>
            <Animated.ScrollView
                style={styles.scrollView}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingTop : height * 0.25,
                    paddingBottom : height * 0.2
                }}
                showsVerticalScrollIndicator={false}
                onScroll={(event) => {
                    const currentY = event.nativeEvent.contentOffset.y
                    if (scrollY.current != currentY) {
                        scrollDistance.setValue(currentY)
                    }
                    scrollY.current = currentY
                }}
            >
                <QuickPicks />
                <ListenAgain />
                <ForgottenFavorites/>
            </Animated.ScrollView>
            <View style={styles.absolute}>
                <Header scrollDistance={scrollDistance} navigation={navigation}/>
            </View>
            {/* <SongScreen/> */}
        </View>
    )
}