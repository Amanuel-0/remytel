"use client";
import React, { useContext, useEffect } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import authContext from "@/states/auth-context";

// This is a Higher Order Component (HOC) that wraps a component and checks if the user is authenticated
const withAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const { isLoggedIn } = useContext(authContext);
    const router = useRouter();

    // Check if the user is authenticated
    const isAuthenticated = isLoggedIn;

    useEffect(() => {
      // If not authenticated, redirect to login page
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, []);

    // Render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;
