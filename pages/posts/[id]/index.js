import React, { useEffect, useState } from "react";
import useFetchTexts from "../../../hooks/FetchText";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export async function getServerSideProps(props) {
  console.log(props.query.id);
  return { props: { id: props.query.id } };
}

export default function Post(props) {
  const [count, setCount] = useState(0);
  const [post, setPost] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const docRef = doc(db, "posts", `${props.id}`);
      const docSnap = await getDoc(docRef);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data());
          // console.log(docSnap.data());
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  console.log(post);

  const { title } = post;
  return (
    <section className="bg-pink-300">
      <h1>{title}</h1>
    </section>
  );
}
