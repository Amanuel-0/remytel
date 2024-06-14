"use client";
import { Product } from "@/models";
import { LocalStorageUtil } from "@/utils";
import { createContext, useCallback, useEffect, useState } from "react";

export interface ISendTopup {
  to: string;
  from: string;
  fromCountryCode: string;
  product: Product | undefined;
  topupFrequency: string | undefined;
  // this is the transaction id that will be used to track the transaction
  // it is fetched from the backend when creating a checkout session
  transactionId?: string | undefined;
}

const sendTopupContext = createContext<{
  sendTopup: ISendTopup;
  setSendTopup: (user: ISendTopup) => void;
}>({
  sendTopup: {
    ...LocalStorageUtil.getItem<ISendTopup>("sendtopup"),
  } as ISendTopup,
  setSendTopup: (user: ISendTopup) => {},
});

export const SendTopupContextProvider = (props: any) => {
  const [sendTopup, setSendTopUp] = useState<ISendTopup>({
    ...(LocalStorageUtil.getItem<ISendTopup>("sendtopup") ??
      ({} as ISendTopup)),
  });

  // Add a state variable to resolve hydration mismatch
  const [to, setTo] = useState<string>(sendTopup.to ?? "");
  const [from, setFrom] = useState<string>(sendTopup.from ?? "");
  const [fromCountryCode, setFromCountryCode] = useState<string>(
    sendTopup.fromCountryCode ?? "",
  );
  const [product, setProduct] = useState<Product | undefined>(
    sendTopup.product ?? undefined,
  );

  useEffect(() => {
    setTo(sendTopup.to);
    setFrom(sendTopup.from);
    setFromCountryCode(sendTopup.fromCountryCode);
    setProduct(sendTopup.product);
  }, [
    sendTopup.to,
    sendTopup.from,
    sendTopup.fromCountryCode,
    sendTopup.product,
  ]);

  const sendTopupHandler = useCallback((sendTopup: ISendTopup) => {
    setSendTopUp(sendTopup);
    LocalStorageUtil.setItem("sendtopup", sendTopup);
  }, []);

  const contextValue = {
    sendTopup: { ...sendTopup, to, from, fromCountryCode, product },
    setSendTopup: sendTopupHandler,
  };

  return (
    <sendTopupContext.Provider value={contextValue}>
      {props.children}
    </sendTopupContext.Provider>
  );
};

export default sendTopupContext;
