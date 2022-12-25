import React, { useState, useEffect } from "react";
import Header from "../../../components/FrontEndComponents/Header";
import {
  Card,
  StyledLoading,
  User,
  Loading,
  Popover,
  Button,
  Modal,
  Input,
  Row,
  Checkbox,
  Avatar,
} from "@nextui-org/react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export async function getServerSideProps(props) {
  console.log(props.query.id);
  return { props: { id: props.query.id } };
}

export default function UserProfile(props) {
  const { currentUser } = useAuth();
  const [count, setCount] = useState(0);
  const [Profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const docRef = doc(db, "users", `${props.id}`);
      const docSnap = await getDoc(docRef);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
          // console.log(docSnap.data());
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getUserPosts() {
      const data = [];
      const postsRef = collection(db, "posts");
      const q = query(postsRef, where("email", "==", props.id));
      const querySnapshot = await getDocs(q);
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
        // console.log(doc.id, "->", doc.data())
      });
      setPosts(data);
      setPostLoading(false);
    }

    getUserPosts();
  }, [count]);

  const { UserName, firstName, lastName, profilePicture, Email } = Profile;

  return (
    <>
      <Header />

      {loading && (
        <div className="grid grid-cols-1 ">
          <div className="pt-40 grid col-span-1">
            <Loading color="success" size="xl"></Loading>
          </div>
        </div>
      )}
      {!loading && (
        // hobbies, relationship status,
        <div className="grid grid-cols-4  justify-center">
          <div
            style={{ backgroundImage: `url(${profilePicture})` }}
            className="container mx-auto rounded-xl pb-96 pt-20 grid col-span-2 md:col-span-4 justify-center"
          >
            <div className="grid grid-cols-2">
              <div className="grid justiy-center col-span-2">
                <div className="grid justify-center">
                  <User
                    bordered
                    as="button"
                    size="xl"
                    color="#0ACF83"
                    src={profilePicture}
                  />
                </div>
              </div>
              <div className="grid justify-center col-span-4">
                <h1 className="font-Space text-Green">{UserName}</h1>
                <p className="text-white font-Space  ">
                  2x national hockey champ, pizza lover,{" "}
                </p>
              </div>

              <div className="grid justify-center col-span-4">
                <h1 className="font-Space text-white">
                  Absoluteawwwwwwwwwwwwwwwwwwwwwwwwwwww chad
                </h1>
              </div>
            </div>
          </div>

          <div className="pt-12 grid col-span-4 md:col-span-4 ">
            {postLoading && (
              <div className="grid grid-cols-1 ">
                <div className="pt-40 grid col-span-1">
                  <Loading color="success" size="xl"></Loading>
                </div>
              </div>
            )}

            {!postLoading && (
              <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="font-Space text-Green">
                  {UserName}&apos;s{" "}
                  <span className="text-black">LifeStories</span>
                </h1>
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
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
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
                        val.title
                          .toLowerCase()
                          .includes(SearchTerm.toLowerCase())
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
                                <Link
                                  href="/user/[id]"
                                  as={`user/${info.email}`}
                                >
                                  <a className="text-pink-500 font-Space">
                                    {info.author}
                                  </a>
                                </Link>
                              </p>

                              <p className="font font-semibold text-black font-Space">
                                {info.date}
                              </p>
                              <Link
                                href="/posts/[id]"
                                as={`/posts/${info.slug}`}
                              >
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
          </div>
        </div>
      )}
    </>
  );
}
