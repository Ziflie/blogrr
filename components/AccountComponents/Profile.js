import React, {useState, useEffect} from "react"
import Link from "next/link"
import { Dropdown, User, Modal, Row, Button, Text } from "@nextui-org/react";
import { useAuth } from "../../context/AuthContext";
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
import AccountDetails from "./AccountDetails";
 
export default function Profile() {

  const {currentUser} = useAuth()
  const [count, setCount] = useState(0)
  const [UserData, setUserData] = useState([])
 

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

  

  const { userName, firstName, lastName, profilePicture } = UserData

  //button function that logs out user
  function SubmitLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
      });
  }
  const fullName = `${firstName} ${lastName}`

    

  return (
    <Dropdown placement="bottom-left">
      <Dropdown.Trigger>
        <User
          bordered
          as="button"
          size="lg"
          color="#0ACF83"
          name={`@${userName}`}
          description={fullName}
          src={profilePicture}
        />
      </Dropdown.Trigger>
      <Dropdown.Menu color="primary" aria-label="User Actions">
        <Dropdown.Item key="profile" css={{ height: "$18" }}>
          <p>Signed in as</p>
          <p>{currentUser.email}</p>
        </Dropdown.Item>
        <Dropdown.Item key="undefined" withDivider>
          <Link href="/user/[id]" as={`/user/${currentUser.email}`}><a>My Profile</a></Link>
        </Dropdown.Item>
       
        
        <Dropdown.Item withDivider>
          <button className="text-red-500" onClick={SubmitLogout}>log out</button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
