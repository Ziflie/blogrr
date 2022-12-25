import React from "react";
import Header from "../components/FrontEndComponents/Header";
import { useAuth } from "../context/AuthContext";
import UserDashBoard from "../components/AccountComponents/UserDashBoard";


export default function MyAccount() {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser && <> <Header /> <UserDashBoard /> </>}
      {!currentUser && <h1>you need to log in to be able to see this page</h1>}
    </div>
  );
}
