import React, { forwardRef, useRef } from 'react'
import { Animated, Dimensions, Image, View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native'
import Header from '../components/header/Header'
import { headerBottomHeight, headerHeight, headerTopHeight } from '../components/consts'
import QuickPicks from '../components/quick-picks/QuickPicks'
import Teste from '../components/Teste'
export default props => {
    const randomArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30]
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
            paddingTop : height * 0.27
            //backgroundColor : 'transparent',
            // marginTop : 200
        },
        image: {
            backgroundColor: 'black',
            height: headerHeight + height * 0.5,
            width: '100%',
            resizeMode: 'stretch',
            opacity: scrollDistance.interpolate({
                inputRange: [0, opacitySection - headerTopHeight * 0.6],
                outputRange: [1, 0],
                extrapolate: 'clamp'
            }),
            transform: [{
                rotateZ: '180deg'
            }]
        },
        absolute: {
            height: '100%',
            width: '100%',
            position: 'absolute',
        },
        padding: {
            // backgroundColor : 'red',
            //height: height * 0.27, //+ height * 0.05,
            width: '100%'
        }
    })
    /* const HeaderTop2 = () => {
        return <HeaderTop opacitySection={opacitySection}/>
    }
    const HeaderBottom2 = () => {
        return <HeaderBottom opacitySection={opacitySection}/>
    } */
        return (
        <View style={styles.container}>
            <View style={styles.absolute}>
                <View style={styles.blackBackground} />
                <Animated.Image style={styles.image}
                    source={
                        require('../Images/background.jpg')
                    }
                />
            </View>
            <Animated.ScrollView
                style={styles.scrollView}
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                //stickyHeaderHiddenOnScroll
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
                {
                    randomArray.map((value) => {
                        return <View key={value} style={{ backgroundColor: 'pink', height: 50, width: '30%', marginBottom : 20 }} />
                    })
                }
            </Animated.ScrollView>
            <View style={styles.absolute}>
                <Header scrollDistance={scrollDistance} />
            </View>
        </View>
    )
}