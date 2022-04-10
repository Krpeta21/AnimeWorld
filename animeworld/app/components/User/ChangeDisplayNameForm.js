import React,{useState} from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from "firebase";

export default function ChangeDisplayNameform(props){
    const {displayName,setShowModal,toastRef, setReloadUserInfo} = props
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const onSubmit= ()=>{
        setError(null)
        if(!newDisplayName){
            setError('Introduce un nombre y apellido.')

        }else if(displayName === newDisplayName){
            setError('Introduce un nombre y apellido diferente al actual.')
        }else{
            setIsLoading(true)
            const update = {
                displayName: newDisplayName
            }
            firebase
                .auth()
                .currentUser.updateProfile(update)
                .then(()=>{      
                    toastRef.current.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Nombre',
                        text2: 'Se ha cambiado el nombre y apellido.',
                        visibilityTime: 3000
                    })                 
                    setIsLoading(false)
                    setReloadUserInfo(true)
                    setShowModal(false)
                })
                .catch(()=>{
                    console.log('Error al actualizar el nombre')   
                    setIsLoading(false)
                })
        }
    }
    return(
        <View style={styles.view}>
            <Input
                placeholder="Nombre y Apellidos"
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'card-account-details-outline',
                    color: '#c2c2c2'
                }}
                defaultValue={displayName || ''}
                onChange={(e)=>setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title='Cambiar nombre'
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
        borderRadius: 20,

    },
    btn:{
        backgroundColor: '#E83A14'
    }
})