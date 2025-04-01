"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    console.log("skickar skapa användare");

    const response = await fetch(
      "http://ubuntu@ec2-51-21-192-79.eu-north-1.compute.amazonaws.com:3001/users",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();

    console.log("data", data);

    if (response.ok) {
      alert("Användaren skapad");
      router.push("/login");
    } else {
      alert("Fel vid skapande av användare");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="h-screen flex justify-center items-center relative bg-green-700">
      <div className="w-full max-w-sm">
        <h1 className="text-center mb-4 text-3xl text-white">Skapa konto</h1>

        <form
          onSubmit={submit}
          className="flex flex-col gap-4 p-6 border rounded-lg shadow-md bg-white"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Create user
          </button>
        </form>
        <Link href={"/"}>
          <h1 className="absolute top-4 left-4 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-100 mt-[-10px] ">
            Broke Bank
          </h1>
        </Link>
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 mt-10 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Go back
        </button>
      </div>
    </div>
  );
}
