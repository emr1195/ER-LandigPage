// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log(import.meta.env)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB4q8DMuZcOfDYW57VfTLKQyiXBnIHz0TQ',
  authDomain: 'er-lp-9b673.firebaseapp.com',
  projectId: 'er-lp-9b673',
  storageBucket: 'er-lp-9b673.appspot.com',
  messagingSenderId: '578306887719',
  appId: '1:578306887719:web:f67072531d4dab7ae8be02',
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)

export const FirebaseAuth = getAuth(FirebaseApp)

export const FirebaseDB = getFirestore(FirebaseApp)
