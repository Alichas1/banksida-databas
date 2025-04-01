"use client";
const { createContext, useState, useContext } = require("react");

const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const [login, setlogin] = useState();
  const [otp, setotp] = useState();

  return (
    <LoginContext.Provider value={{ login, setlogin, otp, setotp }}>
      {children}
    </LoginContext.Provider>
  );
}
export const useLogin = () => useContext(LoginContext);
