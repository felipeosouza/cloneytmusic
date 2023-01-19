import React, { useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { AppContext } from '../../App'
import { titleTextStyle } from '../consts'
import Song from './Song'
export default props => {
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
    const font = 'Palanquin-Bold'
    const styles = StyleSheet.create({
        container: {
            height: height * 0.47,
            width: '100%'
        },
        scrollView: {
            height: height * 0.37,
            width: '100%',
        },
        contentContainer: {
            flexDirection: 'column',
            flexWrap: 'wrap',
            height: height * 0.35,
            paddingRight: width * 0.06
        }
    })

    const Songs = () => {
        const { songList } = useContext(AppContext)
        const songs = songList.tracks.items.slice(0, 20)


        {
            return (
                songs.map((current, i) => {
                    const songCover = current.data.albumOfTrack.coverArt.sources[0].url
                    const songName = current.data.name
                    const getArtists = current.data.artists.items
                    const label = current.data.contentRating.label

                    const manyArtists = (artistsArray) => {
                        let finalString = ''
                        artistsArray.forEach((element, i, array) => {
                            const name = element.profile.name
                            i != array.length - 1 ? finalString = finalString.concat(name + ' & ') : finalString = finalString.concat(name)
                        })
                        return finalString
                    }
                    const artists = getArtists.length > 1 ? manyArtists(getArtists) : getArtists[0].profile.name
                    return <Song key={i} songCover={songCover} songName={songName} artist={artists} label={label}/>
                })
            )
        }

    }
    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'flex-start' }}>
                <Text style={{ color: '#ADADAD', fontSize: width * 0.039, fontWeight: '400', marginLeft: width * 0.07 }}>START RADIO FROM A SONG</Text>
                <Text style={{ ...titleTextStyle, color: 'white', fontSize: width * 0.077, fontWeight: '900', marginLeft: width * 0.07, marginBottom: width * 0.02 }}>Quick picks</Text>
            </View>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                pagingEnabled
                horizontal
                snapToInterval={width * 0.885}
                disableIntervalMomentum
                bounces={false}
                overScrollMode={'never'}
            >
                <Songs />
            </ScrollView>
        </View>
    )
}