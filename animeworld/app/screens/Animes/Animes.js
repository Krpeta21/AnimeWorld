import React, {useState, useEffect, useCallback} from "react"
import { StyleSheet, View, Text} from 'react-native'
import { Icon } from "react-native-elements"
import {firebaseApp} from '../../utils/firebase'
import Loading from "../../components/Loading"
import firebase from 'firebase/app'
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import { getAnimes } from "../../utils/actions"
import {size} from 'lodash'
import ListAnimes from "../../components/Animes/ListAnimes"

export default function Animes(){
    const navigation = useNavigation()
    const [user, setUser] = useState(null)
    const [startAnime, setStartAnime] = useState(null)
    const [animes, setAnimes] = useState([])
    const [loading, setLoading] = useState(false)
    const limitAnimes = 7
    
    
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((userInfo)=>{
            setUser(userInfo)
        })
    },[])
    
    useFocusEffect(
        useCallback(async() => {
            setLoading(true)
            const response = await getAnimes(limitAnimes)
            
            if(response.statusResponse){                
                setStartAnime(response.startAnime)
                setAnimes(response.animes)
            }
            setLoading(false)
        },[])
    )

    return(
        <View style={styles.viewBody}>
            {
                size(animes) > 0 ? (
                    <ListAnimes 
                        animes={animes}
                        navigation={navigation}
                    />
                )
                 :(
                    <View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>No hay animes registrados.</Text>
                    </View>                
                 )
            }
            {user &&(
            <Icon
                reverse
                type='material-community'
                name='plus'
                color='#E83A14'
             containerStyle={styles.btnContainer}
             onPress={()=> navigation.navigate('add-animes')}
            />
            )}
        <Loading isVisible={loading} text="Cargando animes..." />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:'#fff'
    },
    btnContainer:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        shadowColor: 'black',
        shadowOffset:{width: 2,height: 2},
        shadowOpacity: 0.5
    },
    notFoundView:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    notFoundText:{
        fontSize: 18,
        fontWeight: "bold"
    }

})