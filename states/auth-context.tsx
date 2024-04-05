"use client";
import { createContext, useState } from "react";

const authContext = createContext<{
  isLoggedIn: boolean;
  onLogin: (isLoggedIn: boolean) => void;
}>({
  isLoggedIn: Boolean(localStorage.getItem("isLoggedIn") ?? false),
  onLogin: (isLoggedIn) => {},
});

// create a provider that can change the value of the context
export const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(!!localStorage.getItem("isLoggedIn") ?? false),
  );

  const loginHandler = (isLoggedIn: boolean) => {
    setIsLoggedIn(isLoggedIn);
  };

  const contextValue = {
    isLoggedIn: isLoggedIn,
    onLogin: loginHandler,
  };

  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  );
};

export default authContext;
