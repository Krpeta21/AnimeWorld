import React, {useRef}from "react"
import {StyleSheet, View, Text, Image} from 'react-native'
import RegisterForm from "../../components/User/RegisterForm"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'

export default function Register(){
    const toastRef = useRef()
    return(
        <KeyboardAwareScrollView style={styles.fondo}>         
                <Image 
                source={require('../../../assets/img/pc2.png')}
                resizeMode='contain'
                style={styles.logo}
                />
              <View style = {styles.viewForms}>
                    <RegisterForm toastRef={toastRef} />
              </View>
              <Toast ref={toastRef}/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    viewForms:{
        marginRight: 40,
        marginLeft:40,
       
    },
    logo:{
        width: '100%',
        height: 150,
        marginTop: 20
    },
    fondo:{
        backgroundColor: '#FFF1BD'
    }
})