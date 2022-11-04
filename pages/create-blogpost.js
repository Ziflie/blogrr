import React, { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import useFetchTexts from "../hooks/FetchText";
import { doc, setDoc, collection, addDoc, getDoc, Firestore } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

export default function CreateText() {
  const [count, setCount] = useState(0);
  const [addText, setAddText] = useState(false);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [Data, setData] = useState({})
  const { currentUser, userInfo } = useAuth();

  //date
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;


  const data = []  

  //useEffect gets data from the user collection
  useEffect(() => {
    async function getUser() {
      const docRef = doc(db, "users", currentUser.email);
      const docSnap = await getDoc(docRef);
   

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data().firstName);
        setFirstName(docSnap.data().firstName),
        setLastName(docSnap.data().lastName)
        
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getUser();
  }, [count]);


    
 
  //function that passes the data to firestore database when a blogpost is being created
  async function setinfo() {
    if (!text) {
      return;
    }
    const {firstName, lastName } = data;
    const fullName = `${FirstName} ${LastName}`;
    const docRef = await addDoc(collection(db, "posts"), {
      // This is the data that is being passed to the firestore when someone creates post
      id: uuidv4(),
      title: text,
      author: fullName, 
      // bodyText: bodyText,
      date: currentDate,
    });
  }

  return (
    <div className="grid grid-cols-4">
      <div className="pt-40 justify-center grid col-span-4">
        <Input
          size="xl"
          placeholder="insert text"
          value={text}
          onChange={e => setText(e.target.value)}
          aria-label="visible"
        />
      </div>
      <div className="pt-40 justify-center grid col-span-4">
        <Input
          size="xl"
          placeholder="insert text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          aria-label="visible"
        />
      </div>
      {currentUser && <Button onPress={setinfo}>add text </Button>}
      {!currentUser && (
        <Button disabled onPress={undefined}>
          log in to proceed{" "}
        </Button>
      )}
    </div>
  );
}
