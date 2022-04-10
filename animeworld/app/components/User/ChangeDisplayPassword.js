import React,{useState} from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import firebase from "firebase";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default function ChangeDisplayPassword(props){
    const {toastRef, setShowModal} = props
    const [error, setError] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [newDisplayPassword, setNewDisplayPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)    
    const [repeatNewDisplayPassword, setRepeatNewDisplayPassword] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const[showPassword, setShowPassword] = useState(false)
    const[showRepeatPassword, setShowRepeatPassword] = useState(false)
    const[showCPassword, setShowCPassword] = useState(false)
const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)
        return user.reauthenticateWithCredential((cred))
}   

const onChangePasswordPress = () =>{
    if(!currentPassword){
        setError('Escribe la contraseña actual.')
    }else{
    reauthenticate(currentPassword).then(()=>{
        if(!newDisplayPassword || !repeatNewDisplayPassword){            
            setError('Rellena los campos')   
        }   else if(newDisplayPassword.length < 6){
            setError('La contraseña debe tener al menos 6 caracteres')
        }   else if(newDisplayPassword !== repeatNewDisplayPassword){
            setError('Las contraseñas deben coincidir.')
        }else if(newDisplayPassword === currentPassword){
            setError('Introduce una contraseña diferente al actual.')
        }
        else{
            setIsLoading(true)    
        firebase
        .auth()
        .currentUser.updatePassword(newDisplayPassword).then(() =>{            
            setIsLoading(false)
            setShowModal(false)
            toastRef.current.show({
                type: 'success',
                position: 'top',
                text1: 'Password',
                text2: 'Se ha cambiado el password.',
                visibilityTime: 3000
            })
            
        }).catch((error)=>{
            setError(error.message)
            setIsLoading(false)            
        })
    }
    }).catch((error) => {
        setErrorCurrentPassword(error.message)
    })
    
    setError(null)
    setErrorCurrentPassword(null)    
}
}


    return(
        <KeyboardAwareScrollView>
        <View style={styles.view}>
            <Input
                
                placeholder="Contraseña Actual"
                
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
                defaultValue={''}
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    <Icon type='material-community' 
                    name= {showPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconRight}                    
                    onPress={()=> setShowPassword(!showPassword)}
                    />}
                
                
                onChange={(e)=>setNewDisplayPassword(e.nativeEvent.text)}
            />
            <Input
                placeholder="Repite la contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showRepeatPassword ? false : true}
                rightIcon={
                    <Icon type='material-community' 
                    name= {showRepeatPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconRight}                    
                    onPress={()=> setShowRepeatPassword(!showRepeatPassword)}
                    />}
                
                errorMessage={error}
                onChange={(e)=>setRepeatNewDisplayPassword(e.nativeEvent.text)}
            />
            <Button
                title='Cambiar Password'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onChangePasswordPress}
                loading={isLoading}
            />
        </View>
        </KeyboardAwareScrollView>       
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