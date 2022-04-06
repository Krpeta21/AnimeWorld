import React,{useRef} from "react"
import { StyleSheet , View, ScrollView, Text, Image} from "react-native"
import { Divider } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"
import LoginForm from "../../components/User/LoginForm"

export default function Login(){
    const toastRef = useRef()
    return(
        <ScrollView style={styles.fondo}>
        <Image
        source={require('../../../assets/img/logoAW.png')}
        resizeMode='contain'
        style={styles.logo}
        />
        <View style={styles.viewContainer}>
            <LoginForm toastRef={toastRef}/>
            <CreateUser/>
        </View>
        <Toast ref={toastRef}/>
        <Divider  style={styles.divider}/>
    </ScrollView>
    )   
}

function CreateUser(){
    const navigation = useNavigation()
    return(
        <Text style = {styles.textRegister}>
            ¿Quieres registrarte? {''}
            <Text
                style = {styles.linkRegister}
                onPress={()=> navigation.navigate('register')}
            >
             Crear cuenta
            </Text>
        </Text> 
    )
}

const styles = StyleSheet.create({
    logo:{
        width:'100%',
        height: 150,
        marginTop: 20
    },
    viewContainer:{
        marginRight:40,
        marginLeft: 40        
    },
    divider:{
        backgroundColor: '#E83A14',
        margin: 40
    },
    textRegister:{
        marginTop: 15,
        marginLeft:10,
        marginRight: 10,
        textAlign: 'center'        
    },
    linkRegister:{        
        color: '#E83A14',
        fontWeight: 'bold'
    },
    loginText:{
        fontWeight: 'bold',
        marginTop: 25,
        textAlign:'center',
        fontSize: 25,        
        color: '#E83A14'

    },
    fondo:{
        backgroundColor: '#FFF1BD'
    }
})