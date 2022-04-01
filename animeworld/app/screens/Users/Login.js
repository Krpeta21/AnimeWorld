import React from "react"
import { StyleSheet , View, ScrollView, Text, Image} from "react-native"
import { Divider } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"

export default function Login(){
    return(
        <ScrollView>
        <Image
        source={require('../../../assets/img/logoAW.png')}
        resizeMode='contain'
        style={styles.logo}
        />
        <View style={styles.viewContainer}>
            <Text style = {styles.loginText}>Iniciar sesión</Text>
            <CreateUser/>
        </View>
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
        marginLeft: 40,
        fontFamily:'Comic Sans MS'
    },
    divider:{
        backgroundColor: '#E83A14',
        margin: 40
    },
    textRegister:{
        marginTop: 15,
        marginLeft:10,
        marginRight: 10,
        fontFamily:'Comic Sans MS'
    },
    linkRegister:{
        fontFamily:'Comic Sans MS',
        color: '#E83A14',
        fontWeight: 'bold'
    },
    loginText:{
        marginTop: 15,
        marginLeft:10,
        marginRight: 10,
        fontFamily:'Comic Sans MS',
        color: '#E83A14'

    }
})