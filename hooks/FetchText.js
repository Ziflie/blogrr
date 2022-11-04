import React, {useState, useEffect, useRef} from "react"
import {doc, getDoc} from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import {db} from "../firebase"

export default function useFetchTexts() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [texts, setTexts] = useState(null)

    const { currentUser } = useAuth()
    useEffect(() => {
        async function fetchData() {
            try {
                const docRef = doc(db, 'users', currentUser.uid)
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()) {
                    setTexts(docSnap.data().texts)
                }
            } catch (err) {
                setError('failed to load texts')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return {loading, error, texts}

    
}