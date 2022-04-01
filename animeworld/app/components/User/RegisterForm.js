import React, {useState} from "react"
import { StyleSheet, View, Text} from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { validateEmail } from '../../utils/validation'
export default function RegisterForm(){
    const[showPassword, setShowPassword] = useState(false)
    const[showRepeatPassword, setShowRepeatPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())

    const onSubmit = () => {
        if(formData.usuario.length===0||formData.email.length===0||formData.password.length===0||formData.repeatPassword.length===0){
            console.log('Rellena todos los campos')
        } else if(!validateEmail(formData.email)){
            console.log('Email invalido')
        } else if(formData.password !== formData.repeatPassword){
            console.log('Las contraseñas deben coincidir')
        } else if(formData.password.length < 6){
            console.log('El minimo del password es de 6 caracteres')
        }else{
            console.log('Cuenta Creada')
        }
    }

    const onChange = (e,type) =>{
        // console.log(type)
        // console.log(e.nativeEvent.text)
        //setFormData({[type]: e.nativeEvent.text})
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
                title='Unete'
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