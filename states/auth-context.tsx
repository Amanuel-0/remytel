"use client";
import { LocalStorageUtil } from "@/utils";
import { createContext, useState } from "react";

const authContext = createContext<{
  isLoggedIn: boolean;
  onLogin: (isLoggedIn: boolean) => void;
}>({
  isLoggedIn: Boolean(LocalStorageUtil.getItem<boolean>("isLoggedIn") ?? false),
  onLogin: (isLoggedIn) => {},
});

// create a provider that can change the value of the context
export const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(LocalStorageUtil.getItem<boolean>("isLoggedIn") ?? false),
  );

  const loginHandler = (isLoggedIn: boolean) => {
    setIsLoggedIn(isLoggedIn);
    LocalStorageUtil.setItem("isLoggedIn", isLoggedIn);
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
