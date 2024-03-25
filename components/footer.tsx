import React from "react";
import Card from "./card";
import Image from "next/image";
import Textt from "./text";

function Footer() {
  return (
    <footer className="w-full">
      <Card className="flex flex-col items-start gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-12 xl:h-[170px]">
        <div className="flex flex-col items-start gap-3 xl:flex-row xl:items-center xl:justify-start xl:gap-12">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={106.54}
            height={24}
          />

          <Textt variant="p2-satoshi">
            Copyright © 2024 Top-up.et. All rights reserved.
          </Textt>
        </div>

        <div className="flex flex-col items-start gap-2 xl:flex-row xl:items-center xl:justify-end xl:gap-[92px]">
          <a href="#">
            <Textt variant="span2-satoshi">Privacy notice</Textt>
          </a>
          <a href="#">
            <Textt variant="span2-satoshi">Terms & conditions</Textt>
          </a>
          <a href="#">
            <Textt variant="span2-satoshi">Cookies</Textt>
          </a>
        </div>
      </Card>
    </footer>
  );
}

export default Footer;
