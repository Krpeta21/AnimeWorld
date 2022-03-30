import React from "react";
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native'
import { Button } from 'react-native-elements'

export default function UserGuest(){
    return(
        <ScrollView style={StyleSheet.container}>
            <Image
                style={styles.stretch}
                source={require('../../../assets/img/imagen.jpg')}
            />
            <Text style={styles.title}>Inicia sesión para continuar</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 10
    },
    stretch:{
        width:'100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 40

    },
    title:{
        fontFamily:'Comic Sans MS',
        fontWeight:'bold',
        fontSize: 19,
        marginBottom: 10,
        textAlign:'center'        
    }

})