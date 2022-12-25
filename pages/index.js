import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import LogIn from "../components/AccountComponents/LogIn";
import LogOut from "../components/AccountComponents/LogOutButton";
import useFetchTexts from "../hooks/FetchText";
import PostsLayout from "../components/FrontEndComponents/PostsLayout";
import Header from "../components/FrontEndComponents/Header";
  


export default function Home() {
  const { currentUser } = useAuth();
  const { texts, loading, error } = useFetchTexts();
  
 
 
 
  return (
    <>
       <Head>
        <title>LifeStory</title>
        <meta name="description" content="Created by R.Meziani" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
   
      {!currentUser && <LogIn />}
      {currentUser && <Header /> }
      {currentUser && <PostsLayout />}
      </>
  );
}

 // mensen die niet ingelogd zijn moeten niet de andere routes kunnen accessen
