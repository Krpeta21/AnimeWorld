import React from "react";
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native'
import { Button } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'

export default function UserGuest(){
    const navigation = useNavigation()
    return(
        <ScrollView style={StyleSheet.container}>
            <Image
                style={styles.stretch}
                source={require('../../../assets/img/login.png')}
            />
            <Text style={styles.titulo}>Inicia sesión para continuar</Text>
            <Text style={styles.define}> 
            Comparte los mejores animes que has visto para tener tu lista y compartirla con tus amigos.
            </Text>
            <View style={styles.viewBtn}>
                <Button 
                title= 'Visualiza tu perfil'
                buttonStyle={styles.btnStyle}
                containerStyle={styles.btnContainer}
                onPress={()=>navigation.navigate('login')}
                 />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 10
    },
    stretch:{        
        width:'100%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 40

    },
    titulo:{        
        fontWeight:'bold',
        fontSize: 25,
        marginBottom: 10,
        textAlign:'center'        
    },
    define:{        
        marginBottom: 20,
        textAlign: 'center',
        textAlign: 'justify'
    },
    viewBtn:{
        flex:1,
        alignItems: 'center'
    },
    btnStyle:{
        marginTop: 30,
        backgroundColor:'#E83A14',
        borderRadius: 30
        
    },
    btnContainer:{
        width: '50%',
        
    }
})