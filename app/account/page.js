"use client";
import { useLogin } from "@/context/LoginContext";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Account() {
  const [balance, setBalance] = useState(0);
  const { otp, setOtp } = useLogin(); // hämta istället i context
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log(otp);

  async function fetchBalance() {
    setLoading(true);
    try {
      const response = await fetch(
        "http://ubuntu@ec2-51-21-192-79.eu-north-1.compute.amazonaws.com:3001/accounts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp }),
        }
      );
      const data = await response.json();

      console.log("amount", data.amount);

      setBalance(data.amount);

      setError("");
    } catch (error) {
      setError("Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  }

  async function depositMoney() {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3001/me/accounts/transactions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp, amount: Number(amount) }),
        }
      );
      const data = await response.json();
      setBalance(data.amount);
      setError("");
    } catch (error) {
      setError("Failed to deposit money");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (otp) {
      fetchBalance();
    }
  }, [otp]);

  console.log(balance);

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-700 rounded-lg relative">
      <Link href={"/"}>
        <h1 className="absolute top-4 left-4 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-100 mt-[-10px] ">
          Broke Bank
        </h1>
      </Link>
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 w-86 gap-4">
        <h1 className="font-semibold text-3xl">Kontosida</h1>
        <p className="font-semibold">Saldo: {balance}</p>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="text"
          placeholder="Engångslösenord"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="p-2 w-64 border rounded-md"
        />
        <input
          type="number"
          placeholder="Belopp att sätta in"
          value={amount}
          onChange={(e) => setAmount(Math.max(0, e.target.value))}
          min="0"
          className="p-3 mb-4 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={depositMoney}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Sätt in pengar
        </button>
      </div>
    </div>
  );
}
