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
        container : {
            width : '100%',
            marginTop : height * 0.02
        },
        scrollView : {
            height : height * 0.3,
            width : '100%'
        },
        contentContainer : {
            alignItems : 'flex-start',
            flexDirection : 'column',
            flexWrap : 'wrap',
            paddingLeft : width * 0.018,
            paddingRight : width * 0.05
        },
        more : {
            justifyContent : 'center',
            alignItems : 'center',
            height : '30%',
            width : '15%',
            borderColor : '#616161',
            borderWidth : width * 0.002,
            borderRadius : 15,
            marginBottom : width * 0.03
        },
        titleContainer : {
            flexDirection : 'row',
            justifyContent : 'space-between',
            alignItems : 'center',
            paddingLeft : width * 0.055,
            paddingRight : width * 0.055
        }
    })

    const Songs = () => {
        const { songList } = useContext(AppContext)
        const songs = songList.tracks.items.slice(20, 40)

        return (
            <>
                {
                    songs.map((current, i) => {
                        const songCover = current.data.albumOfTrack.coverArt.sources[0].url
                        const songName = current.data.name
                        const getArtists = current.data.artists.items
                        const label = current.data.contentRating.label

                        const manyArtists = (artistsArray) => {
                            let finalString = ''
                            artistsArray.forEach((element, i, array) => {
                                const name = element.profile.name
                                i != array.length - 1? finalString = finalString.concat(name + ' & ') : finalString = finalString.concat(name)
                            })
                            return finalString
                        }
                        const artists = getArtists.length > 1? manyArtists(getArtists) : getArtists[0].profile.name
                        return <Song key={i} songCover={songCover} songName={songName} artist={artists} label={label}/>
                    })
                }
            </>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{...titleTextStyle, color : 'white', fontSize : width * 0.08, marginBottom : width * 0.03}}>Listen again</Text>
                <View style={styles.more}>
                    <Text style={{color : 'white', fontSize : width * 0.03, fontWeight : '500'}}>More</Text>
                </View>
            </View>
            <ScrollView 
                style = {styles.scrollView}
                contentContainerStyle = {styles.contentContainer}
                horizontal
                bounces={false}
            >
                <Songs/>
            </ScrollView>
        </View>
    )
}