"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/context/LoginContext";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setotp } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://ubuntu@ec2-51-21-192-79.eu-north-1.compute.amazonaws.com:3001/sessions",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();

    if (data.otp) {
      alert("Inloggad! Engångslösenord: " + data.otp);

      // spara otp i context
      setotp(data.otp);

      router.push("/account");
    } else {
      alert("Fel vid inloggning");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="h-screen flex justify-center items-center relative bg-green-700">
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

      <div className="w-full max-w-sm">
        <h1 className="text-center mb-4 text-3xl text-white">Logga in</h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 p-6 border rounded-lg shadow-md bg-white"
        >
          <input
            type="text"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
}
