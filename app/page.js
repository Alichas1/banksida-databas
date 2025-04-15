import Link from "next/link";

export default function Homesida() {
  return (
    <div>
      {/* Sticky Navbar */}
      <header className="sticky top-0 w-full bg-green-900 text-white h-18 z-50">
        <div className="flex justify-between px-8 py-7">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-100 mt-[-10px] ">
            Broke Bank
          </h1>
          <nav className="flex gap-5">
            <Link
              href="/login"
              className="font-semibold text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-500 "
            >
              Logga in
            </Link>
            <Link
              href="/signup"
              className="font-semibold text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-500 "
            >
              Skapa användare
            </Link>
            <div>HEJ</div>
          </nav>
        </div>
      </header>

      <div className="relative w-full h-96 bg-blue-50">
        <img
          src="/person.jpg"
          alt="Image"
          className="w-full h-96 object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-6 text-black rounded-2xl text-center">
          <h2 className="text-2xl font-semibold">
            Planer för att flytta i år?
          </h2>
          <p className="mt-2">
            skaffa ett lånelöfte idag, så är du redo för budgivning när ditt
            drömhem dyker upp. Ansök digitalt och få svar direkt i skärmen.
          </p>
          <div className="flex gap-5 justify-center">
            <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded cursor-pointer transition hover:scale-105">
              Ansök om lånelöfte
            </button>
            <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded cursor-pointer transition hover:scale-105">
              läs mer om lånelöfte
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <div className="flex flex-col items-center w-full sm:w-1/2 md:w-1/4">
          <h2 className="text-xl text-black mb-2">Lånelöfte</h2>
          <div className="flex flex-col justify-center items-center h-40 w-70 bg-green-400 rounded-lg hover:bg-green-500">
            <div className="p-3 w-52 text-xl text-white bg-white rounded-full">
              <p className="text-black text-center">skaffa lånelöfte</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full sm:w-1/2 md:w-1/4">
          <h2 className="text-xl text-black mb-2">Lånelöfte</h2>
          <div className="flex flex-col justify-center items-center h-40 w-70 bg-green-400 rounded-lg hover:bg-green-500">
            <div className="p-3 w-52 text-xl text-white bg-white rounded-full">
              <p className="text-black text-center">skaffa lånelöfte</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full sm:w-1/2 md:w-1/4">
          <h2 className="text-xl text-black mb-2">Lånelöfte</h2>
          <div className="flex flex-col justify-center items-center h-40 w-70 bg-green-400 rounded-lg hover:bg-green-500">
            <div className="p-3 w-52 text-xl text-white bg-white rounded-full">
              <p className="text-black text-center">skaffa lånelöfte</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full sm:w-1/2 md:w-1/4">
          <h2 className="text-xl text-black mb-2">Lånelöfte</h2>
          <div className="flex flex-col justify-center items-center h-40 w-70 bg-green-400 rounded-lg hover:bg-green-500">
            <div className="p-3 w-52 text-xl text-white bg-white rounded-full">
              <p className="text-black text-center">skaffa lånelöfte</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-12 mt-20 bg-green-100">
        <div className="text-center cursor-pointer transition hover:scale-105 mt-4">
          <h2 className="text-xl text-black mb-2 font-semibold">BankID</h2>
          <img
            src="/BankID .png"
            alt="Bank logo"
            className="h-64 w-72 border-4 border-green-400 rounded-lg  "
          ></img>
        </div>

        <div className="text-center cursor-pointer transition hover:scale-105 mt-4">
          <h2 className="text-xl text-black mb-2 font-semibold">Swish</h2>
          <img
            src="/SwishLogo.png"
            alt="swish"
            className="h-64 w-72 border-4 border-green-400 rounded-lg  "
          ></img>
        </div>

        <div className="text-center cursor-pointer transition hover:scale-105 mt-4">
          <h2 className="text-xl text-black mb-2 font-semibold">
            DigitaltKort
          </h2>
          <img
            src="/digitalt.jpg"
            alt="Digitalt"
            className="h-64 w-72 border-4 border-green-400 rounded-lg "
          ></img>
        </div>
      </div>
    </div>
  );
}
