import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { Card, Grid, Text, Input, Spacer, Button } from "@nextui-org/react";
import { getAuth, signOut } from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function UserDashBoard() {
  const [UserData, setUserData] = useState([]);
  const [count, setCount] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const { currentUser } = useAuth();

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

   
  const { UserName, firstName, lastName, dateOfBirth, Email, profilepicture } = UserData;

  async function saveData() {
    await setDoc(doc(db, "users", currentUser.email), {
      Email: Email,
      UserName: UserName,
      dateOfBirth: dateOfBirth,
      firstName: firstName, 
      lastName: lastName, 
      profilepicture: imgUrl,
    });
  }

  return (
     
    <div className="grid grid-cols-2 container mx-auto rounded-full pt-12 gap-12">
      <div className="grid justify-center col-span-2">
        <Card>
          <Card.Body>
            <h1>Username</h1>
            <Input readOnly placeholder="Read only" initialValue={UserName} />
          </Card.Body>
        </Card>
      </div>

      <div className="grid justify-center col-span-2">
        <Card>
          <Card.Body>
            <h1>Your first name</h1>
            <Input readOnly placeholder="Read only" initialValue={firstName} />
          </Card.Body>
        </Card>
      </div>

      <div className="grid  justify-center col-span-2">
        <Card>
          <Card.Body>
            <h1>Your last name</h1>
            <Input readOnly placeholder="Read only" initialValue={lastName} />
          </Card.Body>
        </Card>
      </div>

      <div className="grid  justify-center col-span-2">
        <Card>
          <Card.Body>
            <h1>Date of birth</h1>
            <Input
              readOnly
              placeholder="Read only"
              initialValue={dateOfBirth}
            />
          </Card.Body>
        </Card>
      </div>

      <div className="grid  justify-center col-span-2">
        <Card>
          <Card.Body>
            <h1>Your Email</h1>
            <Input readOnly placeholder="Read only" initialValue={Email} />
          </Card.Body>
        </Card>
      </div>

      <div className="grid  justify-center col-span-2">
        <Card>
          <Card.Body>
            <h1>Profile Picture</h1>
           {profilepicture == "" ? <Input value={imgUrl} onChange={e => setImgUrl(e.target.value)} aria-label="open" placeholder="enter img url" css={{ width: "300px" }}/> : <Input readOnly placeholder="Read only" initialValue={profilepicture} /> }

          </Card.Body>
        </Card>
      </div>

      <div className="grid  justify-center col-span-2">
        <Card>
          <Card.Body>
              <button onClick={saveData}>save</button>
          </Card.Body>
        </Card>
      </div>
    </div>
   
  );
}
