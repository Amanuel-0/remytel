"use client";
import { User } from "@/models";
import { LocalStorageUtil } from "@/utils";
import { createContext, useState } from "react";

const userContext = createContext<{
  user: User;
  onUser: (user: User) => void;
}>({
  user: {
    ...LocalStorageUtil.getItem<User>("user"),
  } as User,
  onUser: (user: User) => {},
});

export const UserContextProvider = (props: any) => {
  const [user, setUser] = useState<User>({
    ...(LocalStorageUtil.getItem<User>("user") ?? ({} as User)),
  });

  const userHandler = (user: User) => {
    setUser(user);
    LocalStorageUtil.setItem("user", user);
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
