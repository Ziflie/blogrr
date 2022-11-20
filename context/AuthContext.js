import React, { useContentext, useState, useEffect, useRef, useContext, useDebugValue } from 'react'
import {auth, db} from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, getAuth } from 'firebase/auth'
import {addDoc, collection, doc, getDoc, setDoc} from 'firebase/firestore'

// zoek dit op in de react docs
const AuthContext = React.createContext()


export function useAuth() {
    return useContext(AuthContext)
}

// zoek dit op in de docs, de children gedeelte
export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const userInfo = useRef()


    
    function signup(email, password, FirstName, LastName, DateOfBirth, gender, userName, profilePicture ) {
        createUserWithEmailAndPassword(auth, email, password,).then(cred => {
             async function addingInfo(currentUser) {
             await setDoc(doc(db, "users", email), {
                // hier komt de data die je passed naar users, NADAT je een account hebt gemaakt. 
                firstName: FirstName,
                lastName: LastName,
                dateOfBirth: DateOfBirth,
                UserName: userName,
                Email: email,
                profilepicture: profilePicture,
            })
           
           } 
           return addingInfo()
        }) 
        
    }



    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logOut,
        userInfo
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}