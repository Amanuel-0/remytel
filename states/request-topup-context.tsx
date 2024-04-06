"use client";
import { TopupRequestRequestPayload } from "@/models";
import { LocalStorageUtil } from "@/utils";
import { createContext, useEffect, useState } from "react";

const topupRequestContext = createContext<{
  topupRequest: TopupRequestRequestPayload;
  setTopupRequest: (newTopupRequest: TopupRequestRequestPayload) => void;
}>({
  topupRequest: {
    ...LocalStorageUtil.getItem<TopupRequestRequestPayload>("requesttopup"),
  } as TopupRequestRequestPayload,
  setTopupRequest: (newTopupRequest: TopupRequestRequestPayload) => {},
});

export const TopupRequestContextProvider = (props: any) => {
  const [topupRequest, setTopupRequest] = useState<TopupRequestRequestPayload>({
    ...(LocalStorageUtil.getItem<TopupRequestRequestPayload>("requesttopup") ??
      ({} as TopupRequestRequestPayload)),
  });

  // Add a state variable to resolve hydration mismatch for TopupRequest interface
  const [senderPhoneNumber, setSenderPhoneNumber] = useState<string>("");
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    setSenderPhoneNumber(topupRequest.senderPhoneNumber);
    setCode(topupRequest.code);
  }, [topupRequest.senderPhoneNumber, topupRequest.code]);

  const sendTopupHandler = (topupRequestData: TopupRequestRequestPayload) => {
    setTopupRequest(topupRequestData);
    LocalStorageUtil.setItem("requesttopup", topupRequestData);
  };

  const contextValue = {
    topupRequest: { ...topupRequest, senderPhoneNumber, code },
    setTopupRequest: sendTopupHandler,
  };

  return (
    <topupRequestContext.Provider value={contextValue}>
      {props.children}
    </topupRequestContext.Provider>
  );
};

export default topupRequestContext;
