import React,{useState} from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Input, Button, Icon} from "react-native-elements";
import firebase from "firebase";
import { validateEmail } from "../../utils/validation";

export default function ChangeDisplayEmail(props){
    const {displayEmail,setShowModal,toastRef, setReloadUserInfo} = props
    const [newDisplayEmail, setNewDisplayEmail] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [currentPassword,setCurrentPassword] = useState(null)
    const[showCPassword, setShowCPassword] = useState(false)
    const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)
        return user.reauthenticateWithCredential((cred))
}   

    const onSubmit= ()=>{
        
        setError(null)
        if(!currentPassword){
            setError('Escribe el password actual.')
        }else{
        reauthenticate(currentPassword).then(()=>{
            if(!newDisplayEmail){
                setError('Introduce un email.')
    
            }else if(displayEmail === newDisplayEmail){
                setError('Introduce un email diferente al actual.')
            }else if(!validateEmail(newDisplayEmail)){
                setError('Email invalido.')
            }    else{
                setIsLoading(true)
                const update = newDisplayEmail
                
                firebase
                    .auth()
                    .currentUser.updateEmail(update)
                    .then(()=>{      
                        toastRef.current.show({
                            type: 'success',
                            position: 'top',
                            text1: 'Email',
                            text2: 'Se ha actualizado el email.',
                            visibilityTime: 3000
                        })              
                        setIsLoading(false)
                        setReloadUserInfo(true)
                        setShowModal(false)
                    })
                    .catch(()=>{
                        console.log('Error al actualizar el email.')   
                        setIsLoading(false)
                    })
            }
        }).catch((error)=>{
            setError(error.message)
        })
        
    }
}
    return(
        <View style={styles.view}>
            <Input                
                placeholder="Current Password"                
                containerStyle={styles.input} 
                password={true}
                secureTextEntry={showCPassword ? false : true}               
                rightIcon={
                    <Icon type='material-community' 
                    name= {showCPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconRight}                    
                    onPress={()=> setShowCPassword(!showCPassword)}
                    />}
                onChange={(e)=>setCurrentPassword(e.nativeEvent.text)}
            />
            <Input
                placeholder="Email"
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'email-outline',
                    color: '#c2c2c2'
                }}
                defaultValue={displayEmail || ''}
                onChange={(e)=>setNewDisplayEmail(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title='Cambiar Email'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom: 10
    },
    view:{
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop:20,
        width: '95%',
        borderRadius:20
    },
    btn:{
        backgroundColor: '#E83A14'
    },
    iconRight:{
        color: '#c2c2c2'
    }
})