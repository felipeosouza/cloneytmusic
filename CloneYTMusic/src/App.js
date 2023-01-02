import React, { useState, useRef } from 'react'
import { Animated, View, Text, ScrollView, StatusBar, StyleSheet, Button } from 'react-native'
import SongScreen from './components/SongScreen'
import HomeScreen from './screens/HomeScreen'
export default props => {
    const styles = StyleSheet.create({
        
    })

    return (
      <View>
      <StatusBar backgroundColor={'transparent'} translucent/>
          <HomeScreen/>
          <SongScreen/>
      </View>
    )
}
