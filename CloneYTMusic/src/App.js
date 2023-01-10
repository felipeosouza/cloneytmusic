import React, { useState, createContext, useContext } from 'react'
import { StatusBar } from 'react-native'
import HomeScreen from './screens/HomeScreen'
import LoadingScreen from './screens/LoadingScreen'
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

    if (isReady) {
      return <>
        <StatusBar backgroundColor={'transparent'} translucent />
        <HomeScreen />
      </>
    } else {
      const getSongs = async () => {
        const getSongList = await fetchSongs()
        setCurrentContext({
            isReady: true,
            songList: typeof(getSongList) == 'object'? getSongList : require('./Songs/songs.json')
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