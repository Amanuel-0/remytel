"use client";
import { User } from "@/services";
import { createContext, useState } from "react";

const userContext = createContext<{
  user: User;
  onUser: (user: User) => void;
}>({
  user: {
    ...(JSON.parse(localStorage.getItem("user") ?? "{}") as User),
  } as User,
  onUser: (user: User) => {},
});

export const UserContextProvider = (props: any) => {
  const [user, setUser] = useState<User>({
    ...(JSON.parse(localStorage.getItem("user") ?? "{}") as User),
  } as User);

  const userHandler = (user: User) => {
    setUser(user);
    // store user to local storage
    localStorage.setItem("user", JSON.stringify(user));
  };

  const contextValue = {
    user: user,
    onUser: userHandler,
  };

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};

export default userContext;
