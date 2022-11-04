import React from "react";
import Header from "../components/FrontEndComponents/Header"
import { useAuth } from "../context/AuthContext";
import UserDashBoard from "../components/AccountComponents/UserDashBoard";

export default function MyAccount() {
  const { currentUser } = useAuth();

  return (
   <div>
    <Header />
    <UserDashBoard />
   </div> 
   )
}
