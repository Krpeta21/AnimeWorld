import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {Avatar} from "react-native-elements"
import firebase from "firebase";

export default function InfoUser(props){
    const {userInfo: {photoURL, displayName, email}, toastRef } = props
    console.log(photoURL)
    console.log(displayName)
    console.log(email)


return(
    <View style={styles.viewUserInfo}>
        <Avatar
            title="AW"
            rounded
            size='large'
            containerStyle={styles.userInfoAvatar}
            source={
                photoURL ? {uri:photoURL} : require ('../../../assets/Img/default-profile-icon-8.jpg')
            }
        />
        <View>
            <Text style={styles.displayName}>
                {displayName ? displayName : 'Invitado'}
            </Text>
            <Text> {email ? email : 'Entrada por correo'}</Text>
        </View>
    </View>
)
}

const styles = StyleSheet.create({
viewUserInfo:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    paddingTop: 30,
    paddingBottom: 30,
    
},
userInfoAvatar:{
marginTop: 20,
backgroundColor: '#00a680',
},
displayName:{
fontWeight:'bold',
paddingBottom: 5,
textAlign: "center",
marginTop: 5
}
})