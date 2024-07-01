import Link from "next/link";
import Container from "./container";
import React from "react";
import Card from "./card";
import Textt from "./text";
import Image from "next/image";

function FooterAlt() {
  return (
    <footer className="w-full">
      <Container>
        <Card className="px-12">
          {/* 1 */}
          <div className="flex flex-col items-start gap-5 pt-7 xl:flex-row xl:justify-between xl:gap-0">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={106.54}
              height={24}
            />

            <div className="flex flex-row justify-between gap-4 sm:whitespace-nowrap md:gap-[92px]">
              <div>
                <Textt variant="h6-satoshi" className="text mb-7 text-start">
                  Company
                </Textt>

                <div className="flex flex-col gap-5">
                  <Link href="/about-us">
                    <Textt variant="span2-satoshi" className="text-start">
                      About us
                    </Textt>
                  </Link>
                  <Link href="/help">
                    <Textt variant="span2-satoshi" className="text-start">
                      Help
                    </Textt>
                  </Link>
                </div>
              </div>

              <div>
                <Textt variant="h6-satoshi" className="mb-7 text-start ">
                  Legal
                </Textt>

                <div className="flex flex-col gap-5">
                  <a href="#">
                    <Textt variant="span2-satoshi" className="text-start">
                      Privacy notice
                    </Textt>
                  </a>
                  <Link href="/terms-conditions">
                    <Textt variant="span2-satoshi" className="text-start">
                      Terms & conditions
                    </Textt>
                  </Link>
                  <a href="#">
                    <Textt variant="span2-satoshi" className="text-start">
                      Cookies
                    </Textt>
                  </a>
                </div>
              </div>

              <div>
                <Textt variant="h6-satoshi" className="mb-7 text-start ">
                  Help
                </Textt>

                <div className="flex flex-col gap-5">
                  <a href="#">
                    <Textt variant="span2-satoshi" className="text-start">
                      Support center
                    </Textt>
                  </a>
                  <a href="#">
                    <Textt variant="span2-satoshi" className="text-start">
                      Sitemap
                    </Textt>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="mt-12 flex flex-col gap-1 py-8 md:flex-row md:justify-between">
            <Textt variant="span2-satoshi" className="text-start">
              Gift your Friends & Families back home.
            </Textt>

            <div className="flex gap-5">
              <Link href={"/"}>
                <Image
                  src={"/assets/icons/logo-facebook.svg"}
                  alt={"facebook"}
                  width={24}
                  height={24}
                />
              </Link>
              <Link href={"/"}>
                <Image
                  src={"/assets/icons/logo-linkedin.svg"}
                  alt={"linkedin"}
                  width={24}
                  height={24}
                />
              </Link>
              <Link href={"/"}>
                <Image
                  src={"/assets/icons/logo-twitter.svg"}
                  alt={"twitter"}
                  width={24}
                  height={24}
                />
              </Link>
              <Link href={"/"}>
                <Image
                  src={"/assets/icons/logo-instagram.svg"}
                  alt={"instagram"}
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>

          <hr />

          {/* 3 */}
          <div>
            <Textt variant="span2-satoshi" className="pb-10 pt-4 md:pt-9">
              Copyright © 2024 Top-up.et. All rights reserved.
            </Textt>
          </div>
        </Card>
      </Container>
    </footer>
  );
}

export default FooterAlt;
