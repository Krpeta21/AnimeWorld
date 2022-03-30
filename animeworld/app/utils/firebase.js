import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDbN0M8y4V_pVFJCWypKV3W6zDhZ_M25J0",
    authDomain: "animeworld-674cf.firebaseapp.com",
    projectId: "animeworld-674cf",
    storageBucket: "animeworld-674cf.appspot.com",
    messagingSenderId: "125248884150",
    appId: "1:125248884150:web:1da730605e1560baf34517"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig)