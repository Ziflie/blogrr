import { Input, Button, Card, Container } from "@nextui-org/react";

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function LogIn() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const { login, signup, currentUser } = useAuth();

  async function submitHandler() {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    if (isLoggingIn) {
      try {
        await login(email, password);
      } catch (err) {
        setError("Incorrect email and password");
      }
      return;
    }
  }

  return (
    <div className="container mx-auto ">
      <form className="grid grid-cols-4 gap-4">
        <div className="pt-40 justify-center grid col-span-4 ">
          <h1 className="font-Space text-Green text-9xl block xl:inline">
            Large
          </h1>
        </div>

        <div className="justify-center grid col-span-4 ">
          <h1 className="font-Space text-2xl">Log in</h1>
        </div>
      
        <div className="justify-center grid col-span-4">
          <h1 className="text-xl font-Space">Email:</h1>
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            aria-label="open"
            clearable
            placeholder="johndoe@outlook.com"
            css={{ width: "250px" }}
          />
        </div>

        <div className="justify-center grid col-span-4">
          <h1 className="text-xl font-Space">Password</h1>
          <Input.Password
            value={password}
            onChange={e => setPassword(e.target.value)}
            aria-label="open"
            clearable
            placeholder="password"
          />
          {error && <p className="text-red-500 font-semibold">{error}</p>}
        </div>

        <div className="justify-center grid col-span-4 ">
          <Button
            size="lg"
            css={{ background: "#0ACF83" }}
            auto
            onPress={submitHandler}
          >
            Log in
          </Button>
        </div>

        <div className="pt-4 grid col-span-4 justify-center">
          <h1 className="text-xl">Or login with:</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </div>
      </form>
      <div className="pt-12 grid justify-center ">
        <h1 className="font-Space text-black text-xl block xl:inline pt-3">
          New to large?{" "}
          <Link href="/create-account">
            <a className="font-Space text-blue-600 text-xl block xl:inline pl-1">
              {" "}
              Create an account!
            </a>
          </Link>
        </h1>
      </div>
    </div>
  );
}
