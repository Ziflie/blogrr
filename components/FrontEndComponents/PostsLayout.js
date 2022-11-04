import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import useFetchTexts from "../../hooks/FetchText";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { Container, Card, Row, Text, Col, Grid } from "@nextui-org/react";

// alle data moet gerenderd worden zonder dat de function wordt getriggerd

export default function Hero() {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const { currentUser, addUserToFirebase } = useAuth();

  console.log(currentUser)

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const data = [];
      querySnapshot.forEach(doc => {
       
        console.log(doc)
       
        data.push({
          id: uuidv4(),
          author: doc.data().author,
          title: doc.data().title,
          bodyText: doc.data().bodyText,
          slug: doc.id,
          summary: doc.data().summary,
          date: doc.data().date,
          name: doc.data().author
        });
      });
      setPosts(data);
    }
    getData();
  }, [count]);

 


  return (
    <section className="bg-white text-white">
      <h1 className="text-black"></h1>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(info => (
            <Link key={info.id} href="/posts/[id]" as={`posts/${info.slug}`}>
              <a href="" className="group relative block h-96">
                <span className="absolute inset-0 border-2 border-dashed border-black"></span>

                <div className="relative flex h-full transform items-end border-2 border-black bg-pink-300 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                  <div className="px-8 pb-8 transition-opacity group-hover:absolute group-hover:opacity-0">
                    {/* hier kan de img van je profiel */}

                    <p className="font-semibold text-blue-500 font-Space">{info.author}</p>
                    <p className="font font-semibold text-blue-700 font-Space">{info.date}</p>

                    <h2 className="mt-4 text-4xl text-black font-Space">
                      {info.title}
                    </h2>
                  </div>

                  <div className="absolute p-8 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100">
                    <h3 className="mt-4 text-4xl text-black font-Space">
                      {info.title}
                    </h3>

                    <p className="text-black mt-4">{info.summary}</p>

                    <p className="mt-8 font-bold">Read more</p>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
