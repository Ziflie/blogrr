import {
  Navbar,
  Button,
  Link,
  Text,
  useTheme,
  StyledNavbarCollapseWrapper,
} from "@nextui-org/react";
import React, { useState } from "react";
import Image from "next/image";
import Popup from "../AccountComponents/Popup";
import Profile from "../AccountComponents/Profile";
import Notification from "../AccountComponents/Notification";
import AccountDetails from "../AccountComponents/AccountDetails"

import { useAuth } from "../../context/AuthContext";
import { Spacer, Grid } from "@nextui-org/react";
import { getAuth, signOut } from "firebase/auth";

export default function Header() {
  const { isDark } = useTheme();

  const { currentUser } = useAuth();

  return (
    <Navbar
      css={{ ".nextui-navbar-container": { backgroundColor: "none" } }}
      shouldHideOnScroll
      isBordered={isDark}
      variant="floating"
    >
      <Navbar.Content activeColor="primary" hideIn="xs" variant="highlight">
        <Navbar.Link isActive href="/">
          Home
        </Navbar.Link>
        {currentUser && (
          <Navbar.Link href="/create-blogpost">
            <Button css={{ backgroundColor: "#0ACF83" }}>Create LS</Button>
          </Navbar.Link>
        )}
        <Navbar.Content>{currentUser && <Notification />}</Navbar.Content>
      </Navbar.Content>
      <Navbar.Content>
      <Navbar.Content>{currentUser && <AccountDetails /> }</Navbar.Content>
        <Navbar.Link color="inherit">{currentUser && <Profile />}</Navbar.Link>
      </Navbar.Content>
      
    </Navbar>
  );
}
