import React, { useContext, useEffect, useReducer, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList, StatusBar } from 'react-native'
import { AppContext } from '../App'
import { width, height } from '../components/consts'
import Song from '../components/Song'

export default props => {
    const { songList } = useContext(AppContext)
    //const songList = require('../Songs/songs.json')
    const getSongs = songList.tracks.items
    const initialState = getSongs.map((el, i) => {
        const songCover = el.data.albumOfTrack.coverArt.sources[0].url
        const songName = el.data.name
        const artists = el.data.artists.items
        const label = el.data.contentRating.label
        return { i, songCover, songName, artists, label }
    })
    const reducer = (state, action) => {
        return state = action.payload
    }
    const [songs, dispatch] = useReducer(reducer, initialState)

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    autoFocus
                    style={styles.textInput}
                    returnKeyType={'search'}
                    placeholder='Search songs, artists...'
                    onChangeText={(text) => {
                        const newSongs = initialState.filter((el) => {
                            let foundInArtist = false
                            const songName = String(el.songName).toLowerCase()
                            for(const artist of el.artists){
                                if (artist.profile.name.toLowerCase().indexOf(text.toLowerCase()) >= 0) foundInArtist = true
                            }
                            const foundInSong = songName.indexOf(text.toLowerCase()) >= 0
                            if (foundInSong || foundInArtist) return true
                        })
                        dispatch({ payload: newSongs })
                    }}
                />
            </View>
            <FlatList style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                data={songs.slice(0, 10)}
                renderItem={(el) => {
                    const song = el.item
                    const getArtists = song.artists
                    const manyArtists = (artistsArray) => {
                        let finalString = ''
                        artistsArray.forEach((element, i, array) => {
                            const name = element.profile.name
                            i != array.length - 1 ? finalString = finalString.concat(name + ' & ') : finalString = finalString.concat(name)
                        })
                        return finalString
                    }
                    const artists = getArtists.length > 1 ? manyArtists(getArtists) : getArtists[0].profile.name

                    return <Song songCover={song.songCover} songName={song.songName} artist={artists} label={song.label} />
                }}
                keyExtractor={(song) => song.i}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight
    },
    inputContainer : {
        alignItems : 'center',
        width : '100%',
        borderBottomColor: '#414141',
        borderBottomWidth: 1
    },
    textInput: {
        fontSize: height * 0.023,
        fontWeight: '600',
        color: 'white',
        justifyContent: 'center',
        backgroundColor: '#1C1C1C',
        height: height * 0.06,
        width: '80%',
        borderRadius: 40,
        paddingLeft: width * 0.03,
        marginBottom: height * 0.01,
        borderBottomColor: '#414141'
    }
})