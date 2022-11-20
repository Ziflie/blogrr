import React, { useEffect, useState } from "react";
import useFetchTexts from "../../../hooks/FetchText";
import { Button, User, Loading} from "@nextui-org/react";
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
import Header from "../../../components/FrontEndComponents/Header";

export async function getServerSideProps(props) {
  console.log(props.query.id);
  return { props: { id: props.query.id } };
}

export default function Post(props) {
  const [count, setCount] = useState(0);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true)
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
      } finally {
        setLoading(false)
      }
    }
    getData();
  }, []);

  console.log(post);

  const { author, authorProfilePicture, date, email , id, title, bodyText } = post;
  return (
    <>
      <Header />
        
      {(loading) && (
      <div className="grid grid-cols-1 ">
      <div className="pt-40 grid col-span-1">
        <Loading color="success" size="xl"></Loading>
        </div>
      </div>
      )}
      
        
        {(!loading) && (<div className="bg-white">
        <div className="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
          <div>
            <dt className="pt-2">
              <User
                bordered
                as="button"
                size="lg"
                color="#0ACF83"
                src={authorProfilePicture}
              />
            </dt>
            <dt className="font-medium text-gray-900 pt-2">
              Author: <Link href="/user/[id]" as={`/user/${email}`}><a className="text-Green">{author}</a></Link>
            </dt>
            <dt className="font-medium text-gray-900 pt-2">
              Date posted: <span className="text-Green">{date}</span>
            </dt>
            <h2 className="pt-24 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl ">
              {title}
            </h2>
             <p className="mt-4 text-gray-500 pt-12">{bodyText}</p>
            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              <div key={id} className="border-t border-gray-200 pt-4"></div>
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <picture>
              <source srcSet={authorProfilePicture} type="image/webp" />
              <img
                src={authorProfilePicture}
                alt="blogpost-image"
                className="bg-gray-100 rounded-lg col-span-2 row-span-2"
              />
            </picture>
          </div>
        </div>
      </div>)}
    </>
  );
}
