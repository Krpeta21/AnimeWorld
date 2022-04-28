import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import {size} from 'lodash'
export default function ListAnimes({animes, navigation}) {
  return (
    <View>
      <FlatList
        data={animes}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={(anime)=>(
            <Anime anime={anime} navigation={navigation}/>
        )}
      />
    </View>
  )
}
function Anime({anime, navigation}){
    const {id, images, name, genre, description} = anime.item
    const imageAnime = images[0]
    return (
        <TouchableOpacity>
            <View style={styles.viewAnime}>
                    <View style={styles.viewAnimeImage}>
                    <Image
                        resizeMode='cover'
                        PlaceholderContent={<ActivityIndicator color='#fff'/>}
                        source={{uri: imageAnime}}
                        style={styles.imageAnime}
                    />
                    </View>
                
                <View>
                    <Text style={styles.animeTitle}>
                        {name}
                    </Text>
                    <Text style={styles.animeGenre}>
                        {genre}
                    </Text>
                    <Text style={styles.animeDescription}>
                        {
                            size(description) > 60
                            ? `${description.substr(0,60)}...`
                            : description
                        }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
 viewAnime:{
     flexDirection: 'row',
     margin: 10
 },
 viewAnimeImage:{
    marginRight: 15
 }
 ,
 imageAnime:{
     width: 90,
     height: 90

 },
 animeTitle:{
     fontWeight: 'bold'
 },
 animeGenre:{
     paddingTop: 2,
     color: 'gray'
 },
 animeDescription:{
     paddingTop: 2,
     color: 'gray',
     width: '75%'
 }
})