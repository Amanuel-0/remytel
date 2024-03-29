import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <div className="relative my-10 h-[352px] w-full  sm:my-16">
      {/* <div className="absolute top-0 left-0 z-10 w-full h-full rounded-xl bg-gradient-to-r from-black to-black from-"></div> */}
      <div className="relative h-full w-full">
        <Image
          src="/assets/images/desktop-hero-vector.svg"
          alt="logo"
          width={495}
          height={352}
          className="absolute left-0 top-0 z-30 hidden sm:block"
        />

        <div className="absolute left-0 top-0 z-30 h-full w-full bg-gradient-to-r from-black opacity-80"></div>

        {/* mobile vector left */}
        <Image
          src="/assets/images/mobile-left-hero-vector.svg"
          alt="logo"
          width={235}
          height={91}
          className="absolute bottom-0 left-0 z-30 block sm:hidden"
        />

        {/* mobile vector right */}
        <Image
          src="/assets/images/mobile-right-hero-vector.svg"
          alt="logo"
          width={93}
          height={235}
          className="absolute bottom-0 right-0 z-30 block sm:hidden"
        />

        {/* hero */}
        <Image
          src="/assets/images/women-holding-phone.jpeg"
          alt="logo"
          width={1280}
          height={853}
          className="object-fit-cover absolute left-0 top-0 h-[352px] w-full rounded-[20px] object-cover sm:h-[352px] sm:w-full"
        />
      </div>
      <div className="absolute left-0 top-0 z-40 flex h-full w-full flex-col items-center justify-end pb-5 text-center text-white sm:justify-center sm:pb-0">
        <h2 className="font-craftwork-grotesk text-4xl font-bold leading-[47.3px] sm:w-[377px] sm:text-5xl sm:leading-[63.07px]">
          Send top-up to Ethiopia.
        </h2>
        <p className="px-2 font-satoshi text-sm font-medium leading-[18.4px] sm:w-[377px] sm:p-0 sm:text-base sm:leading-[21.02px]">
          Send recharge to Ethiopian mobiles to connect with friends and family
          in 5 seconds.⚡
        </p>
      </div>
    </div>
  );
}

export default Hero;
