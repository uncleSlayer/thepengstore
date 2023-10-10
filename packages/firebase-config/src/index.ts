import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD1FPA31r73W1XKXBrfhsxjcRAhvFa-Oi0",
    authDomain: "thepengstore-b36b7.firebaseapp.com",
    projectId: "thepengstore-b36b7",
    storageBucket: "thepengstore-b36b7.appspot.com",
    messagingSenderId: "1090941829818",
    appId: "1:1090941829818:web:224a1737e466acba6ab883"
}

export const firebaseApp = initializeApp(firebaseConfig)
export const googleProvier = new GoogleAuthProvider
export { getAuth, signInWithPopup } from 'firebase/auth'