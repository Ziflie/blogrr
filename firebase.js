// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore' 
import { getStorage } from "firebase/storage"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdrUi3qh_y7-2AGvfkijJylzy5ClGxj28",
  authDomain: "lifestory-e5dc6.firebaseapp.com",
  projectId: "lifestory-e5dc6",
  storageBucket: "lifestory-e5dc6.appspot.com",
  messagingSenderId: "855661039469",
  appId: "1:855661039469:web:ed1cc3bd20d513f4acd464",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app);
