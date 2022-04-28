import React from 'react'
import firebase from 'firebase'
import 'firebase/firebase-firestore'
import { fileToBlob } from './helpers'
const db = firebase.firestore(firebase)

export const uploadImage = async(image, path, name) => {
    const result = { statusResponse: false, error: null, url: null}
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(image)
    try{
        await ref.put(blob)
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    } catch(error){
        result.error = error
    }
    return result
}

export const addDocumentWithoutId = async(collection, data) => {
    const result = { statusResponse: false, error: null}
    
    try{
        await db.collection(collection).add(data)
    } catch(error){
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getAnimes = async(limitAnimes) => {
    const result = { statusResponse: true, error: null, animes: [], startAnime: null}
    
    try{
        const response = await db.collection('animes').orderBy("createAt","desc").limit(limitAnimes).get()
        if(response.docs.length > 0){
            result.startAnime = response.docs[response.docs.length - 1]
        }
        response.forEach((doc)=> {
            const anime = doc.data()
            anime.id = doc.id
            result.animes.push(anime)            
        })
    } catch(error){
        result.statusResponse = false
        result.error = error
    }
    return result
}
