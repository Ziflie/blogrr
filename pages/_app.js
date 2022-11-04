import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { NextUIProvider } from "@nextui-org/react";


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
