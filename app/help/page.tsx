import Card from "@/components/card";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Textt from "@/components/text";
import Link from "next/link";
import Container from "@/components/container";
import React from "react";
import Image from "next/image";
import HelpFaqAccordion from "@/components/help-faq-accordion";

function Help() {
  return (
    <>
      <Container>
        <Navbar />
        {/* help hero */}
        <div className="relative my-10 h-[352px] w-full  sm:my-16">
          {/* <div className="absolute top-0 left-0 z-10 w-full h-full rounded-xl bg-gradient-to-r from-black to-black from-"></div> */}
          <div className="relative h-full w-full">
            <Image
              src="/assets/images/desktop-hero-vector.svg"
              alt="logo"
              width={495}
              height={352}
              className="absolute left-0 top-0 z-20 hidden sm:block"
            />

            {/* mobile vector left */}
            <Image
              src="/assets/images/mobile-left-hero-vector.svg"
              alt="logo"
              width={235}
              height={91}
              className="absolute bottom-0 left-0 z-20 block sm:hidden"
            />

            {/* mobile vector right */}
            <Image
              src="/assets/images/mobile-right-hero-vector.svg"
              alt="logo"
              width={93}
              height={235}
              className="absolute bottom-0 right-0 z-20 block sm:hidden"
            />

            {/* hero */}
            <Image
              src="/assets/images/women-holding-phone.jpeg"
              alt="logo"
              width={1280}
              height={853}
              className="object-fit-cover absolute left-0 top-0 h-[352px] w-full rounded-[20px] object-cover sm:h-[352px] sm:w-full"
            />
            <div className="bg-gradient-135 absolute left-0 top-0 h-full w-full rounded-[20px] from-black to-transparent "></div>
          </div>

          <div className="absolute left-0 top-0 z-30 flex h-full w-full flex-col items-center justify-end pb-5 text-center text-white sm:justify-center sm:pb-0">
            <h2 className="font-craftwork-grotesk text-4xl font-bold leading-[47.3px] sm:text-5xl sm:leading-[63.07px]">
              How can we help you?
            </h2>

            <div className="relative mt-8 flex w-full min-w-[329px] max-w-[634px] flex-col items-center px-4">
              <div className="w-full">
                <Image
                  src="/assets/icons/search-icon.svg"
                  alt="logo"
                  width={24}
                  height={25}
                  className="absolute left-8 top-0 m-auto h-full"
                />

                <input
                  type="search"
                  placeholder="Search Our Articles"
                  id="cardNumber"
                  className="block h-[54px] w-full rounded-full border border-[#DBDBDB] p-3 pl-12  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
                />
              </div>
            </div>
          </div>
        </div>

        <section>
          <Textt variant="h1-craftwork" className="my-6">
            Browse our help topics
          </Textt>

          <HelpFaqAccordion />
        </section>
      </Container>

      <footer className="w-full">
        <Container>
          <Card>
            {/* 1 */}
            <div className="flex flex-col gap-5 pt-7 xl:flex-row xl:justify-between xl:gap-0">
              <Image
                src="/assets/images/logo.svg"
                alt="logo"
                width={106.54}
                height={24}
              />

              <div className="flex flex-row justify-between gap-4 sm:whitespace-nowrap md:gap-[92px]">
                <div>
                  <Textt variant="h6-satoshi" className="mb-3 text-start">
                    Company
                  </Textt>

                  <div className="flex flex-col gap-2">
                    <a href="#">
                      <Textt variant="span2-satoshi" className="text-start">
                        About us
                      </Textt>
                    </a>
                    <a href="#">
                      <Textt variant="span2-satoshi" className="text-start">
                        Help
                      </Textt>
                    </a>
                  </div>
                </div>

                <div>
                  <Textt variant="h6-satoshi" className="mb-3 text-start ">
                    Legal
                  </Textt>

                  <div className="flex flex-col gap-2">
                    <a href="#">
                      <Textt variant="span2-satoshi" className="text-start">
                        Privacy notice
                      </Textt>
                    </a>
                    <a href="#">
                      <Textt variant="span2-satoshi" className="text-start">
                        Terms & conditions
                      </Textt>
                    </a>
                    <a href="#">
                      <Textt variant="span2-satoshi" className="text-start">
                        Cookies
                      </Textt>
                    </a>
                  </div>
                </div>

                <div>
                  <Textt variant="h6-satoshi" className="mb-3 text-start ">
                    Help
                  </Textt>

                  <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-1 py-8 md:flex-row md:justify-between">
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
    </>
  );
}

export default Help;
