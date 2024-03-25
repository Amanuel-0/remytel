import React from "react";
import clsx from "clsx";

interface TextProps {
  children: React.ReactNode;
  variant?:
    | "h1-xl-satoshi"
    | "h1-xl-craftwork"
    | "h1-satoshi"
    | "h1-craftwork"
    | "h2-satoshi"
    | "h2-craftwork"
    | "h3-satoshi"
    | "h3-craftwork"
    | "h4-satoshi"
    | "h4-craftwork"
    | "h5-satoshi"
    | "h5-craftwork"
    | "h6-satoshi"
    | "h6-craftwork"
    | "p1-satoshi"
    | "p1-craftwork"
    | "p2-satoshi"
    | "p2-craftwork"
    | "span1-satoshi"
    | "span1-craftwork"
    | "span2-satoshi"
    | "span2-craftwork";
  className?: string;
}

/**
 *
 * @param param0
 * @returns h1-xl: 36px, h1: 32px, h2: 30px, h3: 24px, h4: 20px, h5: 18px, h6: 16px, p1: 14px, p2: 14px, span1: 14px, span2: 14px
 */
function Textt({ children, variant = "p1-satoshi", className }: TextProps) {
  const classes = clsx(
    className,
    "text-center block", // common styles
    // font styles
    {
      "font-craftwork-grotesk":
        variant === "h1-xl-craftwork" ||
        variant === "h1-craftwork" ||
        variant === "h2-craftwork" ||
        variant === "h3-craftwork" ||
        variant === "h4-craftwork" ||
        variant === "h5-craftwork" ||
        variant === "h6-craftwork" ||
        variant === "p1-craftwork" ||
        variant === "p2-craftwork" ||
        variant === "span1-craftwork" ||
        variant === "span2-craftwork",
      "font-satoshi":
        variant === "h1-xl-satoshi" ||
        variant === "h1-satoshi" ||
        variant === "h2-satoshi" ||
        variant === "h3-satoshi" ||
        variant === "h4-satoshi" ||
        variant === "h5-satoshi" ||
        variant === "h6-satoshi" ||
        variant === "p1-satoshi" ||
        variant === "p2-satoshi" ||
        variant === "span1-satoshi" ||
        variant === "span2-satoshi",
    },
    {
      "text-black text-[36px] font-bold leading-[41.41px]":
        variant === "h1-xl-satoshi" || variant === "h1-xl-craftwork",
    }, // 36px
    {
      "text-black text-[32px] font-bold leading-[41.41px]":
        variant === "h1-satoshi" || variant === "h1-craftwork",
    }, // 32px
    {
      "text-black text-3xl":
        variant === "h2-craftwork" || variant === "h2-satoshi",
    }, // 30px
    {
      "text-black text-2xl font-bold leading-[27.46px]":
        variant === "h3-satoshi" || variant === "h3-craftwork",
    }, // 24px
    {
      "text-black text-xl font-bold leading-[25.88px]":
        variant === "h4-satoshi" || variant === "h4-craftwork",
    }, // 20px
    {
      "text-black text-lg font-bold leading-[24.3px]":
        variant === "h5-satoshi" || variant === "h5-craftwork",
    }, // 18px
    {
      "text-black text-lg font-bold leading-[18.3px]":
        variant === "h6-satoshi" || variant === "h6-craftwork",
    }, // 16px
    {
      "text-black text-sm font-medium leading-[18.4px] text-black":
        variant === "p1-satoshi" || variant === "p1-craftwork",
    }, // 14px color: #000000
    {
      "text-[#808080] text-sm font-medium leading-[18.4px] text-[#808080]":
        variant === "p2-satoshi" || variant === "p2-craftwork",
    }, // 14px color: #808080
    {
      "text-black text-sm font-medium leading-[18.4px]":
        variant === "span1-satoshi" || variant === "span1-craftwork",
    }, // 14px color: #000000
    {
      "text-[#808080] text-sm font-medium leading-[18.4px] text-[#808080]":
        variant === "span2-satoshi" || variant === "span2-craftwork",
    }, // 14px color: #808080
  );

  return (
    <>
      {(variant === "h1-satoshi" ||
        variant === "h1-craftwork" ||
        variant === "h1-xl-craftwork" ||
        variant === "h1-xl-satoshi") && <h1 className={classes}>{children}</h1>}
      {(variant === "h2-satoshi" || variant === "h2-craftwork") && (
        <h2 className={classes}>{children}</h2>
      )}
      {(variant === "h3-satoshi" || variant === "h3-craftwork") && (
        <h3 className={classes}>{children}</h3>
      )}
      {(variant === "h4-satoshi" || variant === "h4-craftwork") && (
        <h4 className={classes}>{children}</h4>
      )}
      {(variant === "h5-satoshi" || variant === "h5-craftwork") && (
        <h5 className={classes}>{children}</h5>
      )}
      {(variant === "h6-satoshi" || variant === "h6-craftwork") && (
        <h6 className={classes}>{children}</h6>
      )}

      {(variant === "p1-craftwork" ||
        variant === "p1-satoshi" ||
        variant === "p2-satoshi" ||
        variant === "p2-craftwork") && <p className={classes}>{children}</p>}
      {(variant === "span1-satoshi" ||
        variant === "span1-craftwork" ||
        variant === "span2-satoshi" ||
        variant === "span2-craftwork") && (
        <span className={classes}>{children}</span>
      )}
    </>
  );
}

export default Textt;
