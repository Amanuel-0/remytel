"use client";
import { runOneSignal } from "@/onesignal";
import React, { useEffect } from "react";

function OneSignalWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    runOneSignal();
  }, []);

  return <div>{children}</div>;
}

export default OneSignalWrapper;
