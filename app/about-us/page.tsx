import Card from "@/components/card";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Textt from "@/components/text";
import Link from "next/link";
import Container from "@/components/container";
import React from "react";
import Image from "next/image";

function AboutUs() {
  return (
    <>
      <Container className="relative">
        <Image
          src="/assets/images/hero-background-vector.svg"
          alt="logo"
          width={495}
          height={352}
          className="absolute right-0 top-32 z-10 mx-[100px] mb-20 hidden sm:block"
        />

        <Navbar />

        <Container>
          <div className=" my-10 md:my-[84px]">
            <p className="relative z-20 max-w-[810px] text-start font-craftwork-grotesk text-2xl font-bold md:text-5xl md:leading-[]">
              Remytel was founded to improve people’s lives
            </p>

            <Textt
              variant="p2-satoshi"
              className="relative z-20 mt-5 text-start md:max-w-[923px]"
            >
              Since 2006, our aim has been to build & run the safest, simplest,
              most eﬀective & convenient top-up service, in partnership with the
              best operators and platforms. We provide more secure top-up, to
              more countries, through more operators, than anyone else – helping
              people all around the world to send little bytes of happiness to
              their loved ones, in the blink of an eye. Our customers have
              successfully sent over 500 million top-ups – senRemytel little
              smiles all around the world.
            </Textt>
          </div>

          <div className="mt- relative z-40 flex flex-col items-center justify-center gap-8 xl:flex-row">
            <div className="max-w-[384px]">
              <div className="flex flex-col items-center gap-4">
                {/* icon wrapper */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                  <Image
                    src={"/assets/icons/phone-icon.svg"}
                    alt={"phone-icon"}
                    width={25}
                    height={24}
                  />
                </div>
                <Textt variant="h1-xl-craftwork">5 billion</Textt>
                <Textt variant="p2-satoshi">
                  Since 2006, our aim has been to build & run the safest,
                  simplest top-up service.
                </Textt>

                <Textt variant="p2-satoshi">Learn More</Textt>
              </div>

              <div className="mt-5 flex flex-col items-center gap-4">
                {/* icon wrapper */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                  <Image
                    src={"/assets/icons/flag-icon.svg"}
                    alt={"flag-icon"}
                    width={25}
                    height={24}
                  />
                </div>
                <Textt variant="h1-xl-craftwork">150+</Textt>
                <Textt variant="p2-satoshi" className="mt-5">
                  Since 2006, our aim has been to build & run the safest,
                  simplest top-up service.
                </Textt>

                <Textt variant="p2-satoshi">Learn More</Textt>
              </div>
            </div>

            <div className="max-w-[384px] rounded-2xl">
              <Image
                src={"/assets/images/man-with-phone.jpeg"}
                alt={""}
                width={2731}
                height={4096}
                className="max-w-[384px] rounded-2xl"
              />
            </div>

            <div className="max-w-[384px]">
              <div className="flex flex-col items-center gap-4">
                {/* icon wrapper */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                  <Image
                    src={"/assets/icons/transfer-icon.svg"}
                    alt={"transfer-icon"}
                    width={25}
                    height={24}
                  />
                </div>
                <Textt variant="h1-xl-craftwork">700+</Textt>
                <Textt variant="p2-satoshi" className="mt-5">
                  Since 2006, our aim has been to build & run the safest,
                  simplest top-up service.
                </Textt>

                <Textt variant="p2-satoshi">Learn More</Textt>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4">
                {/* icon wrapper */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                  <Image
                    src={"/assets/icons/person-icon.svg"}
                    alt={"person-icon"}
                    width={17}
                    height={20}
                  />
                </div>
                <Textt variant="h1-xl-craftwork">600K+</Textt>
                <Textt variant="p2-satoshi" className="mt-5">
                  Since 2006, our aim has been to build & run the safest,
                  simplest top-up service.
                </Textt>

                <Textt variant="p2-satoshi">Learn More</Textt>
              </div>
            </div>
          </div>

          <div className="my-10 md:my-[84px]">
            <Textt variant="h1-xl-craftwork">Our Dream</Textt>
            <Textt variant="p2-satoshi" className="mt-5">
              Since 2006, our aim has been to build & run the safest, simplest,
              most eﬀective & convenient top-up service, in partnership with the
              best operators and platforms. We provide more secure top-up, to
              more countries, through more operators, than anyone else – helping
              people all around the world to send little bytes of happiness to
              their loved ones, in the blink of an eye. Our customers have
              successfully sent over 500 million top-ups – senRemytel little
              smiles all around the world.
            </Textt>
          </div>
        </Container>
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

export default AboutUs;
