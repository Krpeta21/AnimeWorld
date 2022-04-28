import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Image,Input, Icon, Button, Avatar } from 'react-native-elements'
import firebase from 'firebase'
import { useNavigation } from '@react-navigation/native'
import {map, size, filter, isEmpty} from 'lodash'
import { loadImageFromGallery } from '../../utils/helpers'
import { addDocumentWithoutId, uploadImage } from '../../utils/actions'
import uuid from 'random-uuid-v4'

const widthScreen = Dimensions.get("window").width

export default function AddAnimesForm(props) {
    const {toastRef,setLoading} = props
    const navigation = useNavigation()
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorGenre, setErrorGenre] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])

    const onSubmit = async() => {
        if(!validForm()){
            return
        }else{
            setLoading(true) 
            const responseUploadImages = await uploadImages()
            const animes = {
                name: formData.name,
                genre: formData.genre,
                description: formData.description,
                images: responseUploadImages,                
                createAt: new Date()
                
            }
            const responseAddDocument = await addDocumentWithoutId('animes', animes)
            setLoading(false)       
            navigation.navigate('animes')
        }
        
    } 

    const uploadImages = async () => {
        const imageUrl = []
        await Promise.all(
            map(imagesSelected, async(image) => {
                const response = await uploadImage(image, "animes", uuid())
                if(response.statusResponse){
                    imageUrl.push(response.url)
                }
        })
        )
        return imageUrl
    }

    const validForm = () => {
        clearErrors()
        let isValid = true
        if(isEmpty(formData.name)){
            setErrorName('Escribe un nombre de anime.')
            isValid - false
        }
        if(isEmpty(formData.genre)){
            setErrorGenre('Escribe un genero de anime.')
            isValid - false
        }
        if(isEmpty(formData.description)){
            setErrorDescription('Escribe una descripción de anime.')
            isValid - false
        }
        if(size(imagesSelected) === 0){
            Alert.alert("Debes agregar una imagen")
            isValid - false
        }
        
            return isValid
        
        
    }
const clearErrors = () => {
    setErrorDescription(null)
    setErrorGenre(null)
    setErrorName(null)
}
  return (
    <ScrollView style={styles.formContainer}>            
            <ImageAnime
                    imageAnime={imagesSelected[0]}
            />            
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorGenre={errorGenre}
                errorDescription={errorDescription}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title='Añadir Anime'
                containerStyle={styles.btnCointainerCrearAnime}
                buttonStyle={styles.btnCrearAnime}
                onPress={onSubmit}
            />
        </ScrollView>
  )
}

function ImageAnime({imageAnime}){
   return (
       <View style={styles.viewPhoto}>
           <Image
                style={{width: widthScreen, height: 200}}
                source={
                    imageAnime
                    ? {uri: imageAnime}
                    : require("../../../assets/img/logoAW.png")
                }
           />
       </View>
   ) 
}

function UploadImage({toastRef,imagesSelected,setImagesSelected}){
    const imageSelect = async() =>{
        const response = await loadImageFromGallery([4,3])
        if(!response.status){
            toastRef.current.show("No has seleccionado ninguna imagen", 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar Imagen",
            "¿Estás seguro que deseas borrar la imagen?",
            [
                {
                    text: "Si",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl => imageUrl !== image))
                        )
                    }
                },
                {
                    text: "No",
                    style: "cancel"
                }                
            ],
            {
                cancelable: true
            }
        )
    }

    return(
        <ScrollView
            horizontal
            style={styles.viewImage}
        >
            {
                size(imagesSelected) < 1 && (
                    <Icon
                    type='material-community'
                    name='camera'
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                />
                )                
            }
            {
                map(imagesSelected,(imageAnime, index) => (
                        <Avatar
                            key={index}
                            style={styles.miniatureStyle}
                            source={{uri: imageAnime}}
                            onPress={() => removeImage(imageAnime)}
                        />
                ))
            }
            
        </ScrollView>
    )
}

function FormAdd({formData,setFormData,errorName,errorGenre,errorDescription}){
    
const onChange=(e,type)=>{
    setFormData({ ...formData,[type] : e.nativeEvent.text})
}

    return(
        <View style={styles.viewForm} >
            <Input
                placeholder="Nombre del anime"
                defaultValue={formData.name}
                onChange={(e)=> onChange(e, "name")}
                errorMessage={errorName}
                containerStyle={styles.inputForm}              
                
            />
            <Input
                placeholder="Genero del Anime"
                defaultValue={formData.genre}
                onChange={(e)=> onChange(e, "genre")}
                errorMessage={errorGenre}
                containerStyle={styles.inputForm}                           
            />
            <Input
                placeholder="Descripción del anime"
                defaultValue={formData.description}
                onChange={(e)=> onChange(e, "description")}
                errorMessage={errorDescription}
                multiline
                containerStyle={styles.inputForm}                           
            />
        </View>
    )
}

const defaultFormValues = () =>{
    return{
        name: "",
        genre:"",
        description: ""
    }
}
const styles = StyleSheet.create({
    viewForm:{
       marginHorizontal: 10 
    },
    formContainer:{
        height:"100%",
        marginTop: 30
    },
    inputForm:{
        width: '100%',
        marginTop: 20
    },
    btnCointainerCrearAnime:{
        width: '50%',
        height: 150,
        borderRadius:30,
        marginLeft: 100 ,
        marginTop:50,  
        paddingTop: 10,
        paddingBottom: 10
        
    },
    btnCrearAnime:{
        backgroundColor: '#E83A14'
    },
    iconRight:{
        color: '#c1c1c1'
    },
    logo:{
        width: '100%',
        height: 150,
        marginTop: 20
    },
    viewImage:{
        flexDirection: "row",
        marginLeft: 120,
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon:{
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        height: 100,
        width: 100,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle:{
        width: 120,
        height:90,
        marginRight:10
    },
    viewPhoto:{
        alignItems: 'center',
        height: 200,
        marginBottom: 20
    }
})