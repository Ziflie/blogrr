import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { NextUIProvider } from "@nextui-org/react";
import Header from "../components/FrontEndComponents/Header";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </NextUIProvider>
  );
}

export default MyApp;
