// Create a Providers component to wrap your application with all the components requiring 'use client', such as next-nprogress-bar or your different contexts...
"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactNode } from "react";

const ProgressProovider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="#04A94D99"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressProovider;
