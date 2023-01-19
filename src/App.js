import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState, createContext, useContext } from 'react'
import { StatusBar } from 'react-native'
import HomeScreen from './screens/HomeScreen'
import LoadingScreen from './screens/LoadingScreen'
import SearchScreen from './screens/SearchScreen'
import { fetchSongs } from './Songs/getSongs'

const AppContext = createContext({
  isReady: false,
  songList: []
})

export default props => {
  const [currentContext, setCurrentContext] = useState({
      isReady: false,
      songList: []
  })

  const App = () => {
    const { isReady } = useContext(AppContext)
    const Stack = createNativeStackNavigator()
    if (isReady) {
      return <>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{
                headerShown : false
              }}
            />
            <Stack.Screen
              name='Search'
              component={SearchScreen}
              options={{
                headerShown : false
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    } else {
      const getSongs = async () => {
        const getSongList = await fetchSongs()
        setCurrentContext({
            isReady: true,
            songList: getSongList.message != null? require('./Songs/songs.json') : getSongList
        })
      }
      getSongs()

      return <LoadingScreen/>
    }
  }

  return (
    <AppContext.Provider value={currentContext}>
      <App />
    </AppContext.Provider>
  )
}

export { AppContext }