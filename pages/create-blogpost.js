import React, { useState, useEffect } from "react";
import { Input, Button, Dropdown, Checkbox } from "@nextui-org/react";
import useFetchTexts from "../hooks/FetchText";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  Firestore,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Header from "../components/FrontEndComponents/Header";
import TextareaAutosize from "react-textarea-autosize";
import { GoogleAuthProvider } from "firebase/auth";

export default function CreateText() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState(false);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState([]);

  const [blogText, setBlogText] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [authorProfilePicture, setauthorProfilePicture] = useState("");
  const [Data, setData] = useState({});

  const { currentUser, userInfo } = useAuth();
  const router = useRouter()
 
  //getting the current date
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  const data = [];

  //useEffect gets data from the user collection
  useEffect(() => {
    async function getUser() {
      const docRef = doc(db, "users", currentUser.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data().firstName);
        setFirstName(docSnap.data().firstName),
          setLastName(docSnap.data().lastName);
        setauthorProfilePicture(docSnap.data().profilePicture);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getUser();
  }, [count]);

  //function that passes the data to firestore database when a blogpost is being created
  
  async function setinfo() {
    if (blogText == "" && title == "") {
      return;
    }
    const { firstName, lastName } = data;
    const fullName = `${FirstName} ${LastName}`;
    const docRef = await addDoc(collection(db, "posts"), {
      // This is the data that is being passed to the firestore when someone creates post
      id: uuidv4(),
      author: fullName,
      date: currentDate,
      authorProfilePicture: authorProfilePicture,
      email: currentUser.email,

      title: title,
      bodyText: blogText,
    });
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push("https://google.com")
  }
 

  return (
    <>
      <Header />
      <div className="grid grid-cols-4 container mx-auto">
        <div className="grid col-span-4 pt-24 justify-end">
          {currentUser && (
            <Button color="success" onClick={setinfo}>
              Publish
            </Button>
          )}
        </div>
        <div
          style={{ userSelect: "none" }}
          className="pt-40 justify-center grid col-span-4"
        >
          {/* <div>
            <h1 className="text-black content-center ">
              My <span className="text-Green font-Space">LifeStory</span> is
              about <span className="text-Green">{topic.join(", ")} </span>
              <Dropdown>
                <Dropdown.Button flat>Trigger</Dropdown.Button>
                <Dropdown.Menu aria-label="Dynamic Actions">

                </Dropdown.Menu>
              </Dropdown>
            </h1>
          </div> */}
 
          <TextareaAutosize
            className="pt-24 bg-white rounded-lg font-Space text-4xl text-Green font-bold"
            onChange={e => setTitle(e.target.value)}
            cols={40}
            rows={1}
            style={{ resize: "none" }}
            defaultValue="Title of your LifeStory..."
            required
          />

          <TextareaAutosize
            className="pt-12 bg-white rounded-lg font-Space text-xl text-black"
            onChange={e => setBlogText(e.target.value)}
            cols={40}
            rows={1}
            style={{ resize: "none" }}
            defaultValue="Tell your story..."
            required
          />
        </div>

        {!currentUser && (
          <Button disabled onPress={undefined}>
            log in to proceed{" "}
          </Button>
        )}
      </div>
    </>
  );
}
