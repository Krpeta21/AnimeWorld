import React, {useState, useRef, useEffect} from "react"
import {View, Text, StyleSheet} from 'react-native'
import firebase from "firebase"
import Toast from "react-native-toast-message"
import { Button } from "react-native-elements"
import InfoUser from "../../components/User/InfoUser"

export default function UserLogged(){
    const [userInfo, setUserInfo] = useState(null)
    const toastRef = useRef()
    useEffect(()=>{
        (async()=>{
           const user= await firebase.auth(). currentUser
           setUserInfo(user)
        })()
    }, [])

    return(
        <View style={styles.viewUserInfo}>
            {userInfo&&<InfoUser userInfo={userInfo} toastRef={toastRef}/>}
            <Text>AccountOptions</Text>
            <Button 
            containerStyle={styles.btnCointainerSignOut}
            buttonStyle={styles.btnSignOut}
            title='Cerrar sesión' onPress={()=>firebase.auth().signOut()}/>
            <Toast ref={toastRef}/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
      minHeight:'100%',
      backgroundColor: '#f2f2f2'  
    },
    btnCointainerSignOut:{       
        width: '85%',
        borderRadius:30,
        marginLeft: 40 ,
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        paddingTop: 10,
        paddingBottom: 10
        
    },
    btnSignOut:{
        
        backgroundColor:'#E83A14'
       
        
       
    }
})