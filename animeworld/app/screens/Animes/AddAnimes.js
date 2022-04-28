import { StyleSheet, Text, View } from 'react-native'
import React,{useRef,useState} from 'react'
import Loading from '../../components/Loading'
import Toast from 'react-native-toast-message'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import AddAnimesForm from '../../components/Animes/AddAnimesForm'

export default function AddAnimes() {
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)
  return (
    <KeyboardAwareScrollView>
        <AddAnimesForm toastRef={toastRef} setLoading={setLoading}/>
      <Loading isVisible={loading} text="Añadiendo Anime..."/>
      <Toast ref={toastRef} position='top' opacity={0.9}/>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})