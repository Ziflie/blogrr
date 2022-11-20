import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
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
import {
  Container,
  Card,
  Row,
  Text,
  Col,
  Grid,
  Input,
  Button,
  Avatar,
  Loading,
} from "@nextui-org/react";

// alle data moet gerenderd worden zonder dat de function wordt getriggerd

export default function Hero() {
  const [SearchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { currentUser, addUserToFirebase } = useAuth();

  console.log(currentUser);

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const data = [];
      querySnapshot.forEach(doc => {
        
        data.push({
          id: uuidv4(),
          author: doc.data().author,
          title: doc.data().title,
          bodyText: doc.data().bodyText,
          slug: doc.id,
          summary: doc.data().summary,
          date: doc.data().date,
          name: doc.data().author,
          profilePicture: doc.data().authorProfilePicture,
          email: doc.data().email,
        });
      });
      setPosts(data);
      setLoading(false);
    }
    getData();
  }, [count]);

   

  return (
    <section className="bg-white text-white">
      <h1 className="text-black"></h1>
      {loading && (
        <div className="grid grid-cols-1 ">
          <div className="pt-40 grid col-span-1">
            <Loading color="success" size="xl"></Loading>
          </div>
        </div>
      )}
      {!loading && (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <Input
            size="lg"
            onChange={event => {
              setSearchTerm(event.target.value);
            }}
            shadow={false}
            labelPlaceholder="Search"
            status="warning"
            contentLeft={
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            }
          />
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading && <Loading size="lg" />}
            {posts
              .filter(val => {
                if (SearchTerm == "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(SearchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map(info => (
                <>
                  <a href="" className="group relative block h-96">
                    <span className="absolute inset-0 border-2 border-dashed border-black"></span>

                    <div className="items-center justify-start relative flex h-full transform border-2 border-black bg-green-300 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                      <div className=" self-auto px-8 pb-8 transition-opacity group-hover:absolute group-hover:opacity-0">
                        <a>
                          <Avatar src={info.profilePicture} size="lg" />
                        </a>
                        <p className="font-semibold text-pink-500 font-Space">
                          {info.author}
                        </p>

                        <p className="font font-semibold text-black font-Space">
                          {info.date}
                        </p>

                        <h2 className="mt-4 text-4xl text-black font-Space">
                          {info.title}
                        </h2>
                      </div>

                      <div className="absolute p-8 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100">
                        <Link href="/user/[id]" as={`user/${info.email}`}>
                          <Avatar src={info.profilePicture} size="lg" />
                        </Link>

                        <p className="font-semibold text-pink-500 font-Space">
                          <Link href="/user/[id]" as={`user/${info.email}`}>
                            <a className="text-pink-500 font-Space">
                              {info.author}
                            </a>
                          </Link>
                        </p>

                        <p className="font font-semibold text-black font-Space">
                          {info.date}
                        </p>
                        <Link href="posts/[id]" as={`posts/${info.slug}`}>
                          <h2 className="mt-4 text-4xl text-black font-Space">
                            {info.title}
                          </h2>
                        </Link>
                      </div>
                    </div>
                  </a>
                </>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}
