import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Grid,
  Input,
  Spacer,
  Container,
  Card,
  Row,
  Text,
  Radio,
  Dropdown,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";

export default function CreateAccount() {
  const router = useRouter();
 
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");

  const [DateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { currentUser, signup } = useAuth();

  async function CreateAccount() {
    await signup(
      email,
      password,
      FirstName,
      LastName,
      DateOfBirth,
      gender,
      userName
    );
  }

    const handleSubmit = (e) => {
      e.preventDefault()
      router.push("/")
  }


   return (
    <div className="container mx-auto ">
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-12">
        <div className="pt-12">
          <Link href="/">
            <a className="font-Space font-bold text-blue-700 text-2xl">
              Return to Login
            </a>
          </Link>
        </div>
        <div className="pt-40 justify-center grid col-span-4 ">
          <h1 className="font-Space text-Green text-9xl block xl:inline">
            Large
          </h1>
        </div>

        <div className="justify-end grid col-span-2">
          <h1 className="font-Space text-xl">What is your first name?</h1>
          <Input
            value={FirstName}
            onChange={e => setFirstName(e.target.value)}
            aria-label="open"
            placeholder="Patrick"
            css={{ width: "250px" }}
          />
        </div>

        <div className="justify-start grid col-span-2">
          <h1 className="font-Space text-xl">What is your last name?</h1>
          <Input
            value={LastName}
            onChange={e => setLastName(e.target.value)}
            aria-label="open"
            placeholder="Bateman"
            css={{ width: "250px" }}
          />
        </div>

        <div className=" justify-end grid col-span-2">
          <h1 className="font-Space text-xl">Date of birth?</h1>
          <Input
            onChange={e => setDateOfBirth(e.target.value)}
            width="186px"
            css={{ width: "250px" }}
            type="date"
          />
        </div>

        <div className="justify-start  grid col-span-2">
          <h1 className="font-Space text-xl">Display name?</h1>
          <Input
            value={userName}
            onChange={e => setUserName(e.target.value)}
            aria-label="open"
            placeholder="GreenDoublePump223"
            css={{ width: "250px" }}
          />
        </div>

        <div className="justify-end grid col-span-2">
          <h1 className="font-Space text-xl">Email adress?</h1>
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            aria-label="open"
            placeholder="LetsSeePaullAllensMail@large.com"
            css={{ width: "300px" }}
          />
        </div>

        <div className="justify-start grid col-span-2">
          <h1 className="font-Space text-xl">
            Last but not least, your password?
          </h1>
          <Input.Password
            value={password}
            onChange={e => setPassword(e.target.value)}
            aria-label="open"
            placeholder="Password"
            css={{ width: "300px" }}
            password
          />
        </div>

        <div className="justify-center grid col-span-4 ">
          <Button
            size="lg"
            css={{ background: "#0ACF83" }}
            auto
            onPress={CreateAccount}
            type="submit"
          >
            Create account
          </Button>
 
        </div>

        <div className=" grid col-span-4 justify-center">
          <h1 className="text-xl">Or create an account with:</h1>
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
      <div className="pb-12 grid justify-center "></div>
    </div>
  );
}
