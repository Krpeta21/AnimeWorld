import React, {useState} from "react"
import { StyleSheet, View, Text} from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { validateEmail } from '../../utils/validation'
import firebase from "firebase"
import { useNavigation } from "@react-navigation/native"

export default function RegisterForm(props){
    const {toastRef} = props
    const[showPassword, setShowPassword] = useState(false)
    const[showRepeatPassword, setShowRepeatPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const navigation = useNavigation()

    const onSubmit = () => {
        if(formData.usuario.length===0||formData.email.length===0||formData.password.length===0||formData.repeatPassword.length===0){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Vacio',
                text2: 'Necesitas llenar todo los campos 😖',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        } else if(!validateEmail(formData.email)){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Correo',
                text2: 'Email invalido 🙁',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        } else if(formData.password !== formData.repeatPassword){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Contraseña',
                text2: 'Las contraseñas no coinciden 😵‍',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        } else if(formData.password.length < 6){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Password',
                text2: 'La contraseña debe contener por lo menos 6 caracteres 😓',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        }else{
            firebase
          .auth()
          .createUserWithEmailAndPassword(formData.email, formData.password)
          .then((response)=>{
            navigation.navigate('user')
        })
        .catch(()=>{
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Cuenta',
                text2: 'Este correo ya fue utilizado 😡',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        })
        }
    }

    const onChange = (e,type) =>{
        setFormData({...formData,[type]: e.nativeEvent.text})
    }

    
    return(
        <View style={styles.formContainer}>
            <Input
                placeholder="Nombre de usuario"
                containerStyle={styles.inputForm}
                onChange={(e)=>onChange(e, 'usuario')}
                rightIcon={<Icon type='material-community' name= 'badge-account' iconStyle={styles.iconRight}/>}
            />
            <Input
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                onChange={(e)=>onChange(e, 'email')}
                rightIcon={<Icon type='material-community' name= 'email' iconStyle={styles.iconRight}/>}
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassword ? false : true}
                onChange={(e)=>onChange(e, 'password')}
                rightIcon={
                <Icon type='material-community' 
                name= {showPassword ? 'eye-circle-outline' : 'eye-circle'}
                iconStyle={styles.iconRight}
                onPress={()=> setShowPassword(!showPassword)}
                />}
            />
            <Input
                placeholder="Confirmar Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showRepeatPassword ? false : true}
                onChange={(e)=>onChange(e, 'repeatPassword')}
                rightIcon={<Icon 
                    type='material-community' 
                    name= {showRepeatPassword ? 'eye-circle-outline' : 'eye-circle'}
                    iconStyle={styles.iconRight}
                    onPress={()=> setShowRepeatPassword(!showRepeatPassword)}
                    />}                    
            />
            <Button
                title='Registrate'
                containerStyle={styles.btnCointainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
            />
        </View>
    )
}

function defaultFormValues(){
    return{
        usuario:'',
        email: '',
        password: '',
        repeatPassword:''
    }     
    
}

const styles = StyleSheet.create({
    formContainer:{
        marginTop: 30,
        backgroundColor: '#DFDFDE',
        borderRadius: 20        
    },
    inputForm:{
        width: '100%',
        marginTop: 10
    },
    btnCointainerRegister:{
        marginTop:20,        
        width: '85%',
        borderRadius:30,
        marginBottom: 7,
        marginLeft: 25      
    },
    btnRegister:{
        
        backgroundColor: '#E83A14'
        
    },
    iconRight:{
        color: '#E83A14'
    }
})