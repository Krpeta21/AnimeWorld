import React, {useState, useRef, useEffect} from "react"
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import firebase from "firebase"
import Toast from "react-native-toast-message"
import { Button } from "react-native-elements"
import InfoUser from "../../components/User/InfoUser"
import UserOptions from "../../components/User/UserOptions"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function UserLogged(){
    const [userInfo, setUserInfo] = useState(null)
    const [reloadUserInfo, setReloadUserInfo] = useState(false)
    const toastRef = useRef()
    useEffect(()=>{
        (async()=>{
           const user= await firebase.auth().currentUser
           setUserInfo(user)
        })()
    setReloadUserInfo(false)
    }, [reloadUserInfo])

    return(
        <KeyboardAwareScrollView style={styles.fondo}>
        <View style={styles.viewUserInfo}>
            {userInfo&&(<InfoUser userInfo={userInfo} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo} />)}
            <UserOptions userInfo = {userInfo} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo}/>
            <Button 
            containerStyle={styles.btnCointainerSignOut}
            buttonStyle={styles.btnSignOut}
            title='Cerrar sesión' onPress={()=>firebase.auth().signOut()}/>
            <Toast ref={toastRef}/>
        </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
      minHeight:'100%',
      backgroundColor: '#FFF1BD'  
    },
    btnCointainerSignOut:{       
        width: '50%',
        borderRadius:30,
        marginLeft: 100 ,
        marginTop:50,
        borderTopWidth: 1,
        borderTopColor: '#E83A14',
        borderBottomWidth: 1,
        borderBottomColor: '#E83A14',
        paddingTop: 10,
        paddingBottom: 10
        
    },
    btnSignOut:{       
        backgroundColor:'#E83A14' 
    },
    fondo:{
        backgroundColor: '#FFF1BD'
    }
})