"use client";
import React, { useContext, useEffect } from "react";
import authContext from "@/states/auth-context";
import { useRouter } from "next-nprogress-bar";

// This is a Higher Order Component (HOC) that wraps a component and checks if the user is authenticated
const withOutAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const { isLoggedIn } = useContext(authContext);
    const router = useRouter();

    // Check if the user is authenticated
    const isAuthenticated = isLoggedIn;

    useEffect(() => {
      // If authenticated, redirect to home page
      if (isAuthenticated) {
        router.push("/account/home");
      }
    }, []);

    // Render the wrapped component if authenticated
    return !isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withOutAuth;
