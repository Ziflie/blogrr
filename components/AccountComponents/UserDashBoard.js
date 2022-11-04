import React, {useState, useEffect} from "react"
import {useAuth} from "../../context/AuthContext"
import Link from "next/link"
import { Card, Grid, Text } from "@nextui-org/react"
import { getAuth, signOut } from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import {db} from "../../firebase"




export default function UserDashBoard() {
   
  const [UserData, setUserData] = useState([])
  const [count, setCount] = useState(0)
  const {currentUser} = useAuth()


  useEffect(() => {
    async function getUserData() {
      const docRef = doc(db, "users", currentUser.email);
      const docSnap = await getDoc(docRef);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          // console.log(docSnap.data());
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserData();
  }, [count]);

  console.log(UserData)

  const { UserName, firstName, lastName } = UserData

  
  return (
      <div className="grid grid-cols-4 container mx-auto rounded-full pt-12">
        <div className="grid col-span-2">
          <h1>{UserName}'s Account information:</h1>
        </div>
      </div>
    )
}