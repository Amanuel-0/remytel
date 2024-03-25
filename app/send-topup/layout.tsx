import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Container from "@/components/container";
import React from "react";
import Image from "next/image";

function SendTopupLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="relative flex min-h-screen flex-col items-center justify-between">
      <Image
        src="/assets/images/hero-background-vector.svg"
        alt="logo"
        width={495}
        height={352}
        className="absolute bottom-0 right-0 mx-[340px] mb-20 hidden sm:block"
      />

      <Navbar />

      <section className="relative m-auto mb-10 mt-10 w-full max-w-[505px] rounded-2xl md:mb-16 md:mt-[60px]">
        {children}
      </section>

      <Footer />
    </Container>
  );
}

export default SendTopupLayout;
