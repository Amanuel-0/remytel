import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Container from "@/components/container";
import React from "react";
import Image from "next/image";

function SendTopupLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="relative flex min-h-screen flex-col items-center justify-between bg-[#DDE1E9]">
      <Image
        src="/assets/images/hero-background-vector.svg"
        alt="logo"
        width={400}
        height={400}
        className="absolute bottom-[10%] right-[10%] mb-20 hidden h-[45%] w-[45%] sm:block"
      />

      <Navbar />

      <section className="relative z-40 m-auto mb-10 mt-10 w-full max-w-[505px] rounded-2xl md:mb-16 md:mt-[60px]">
        {children}
      </section>

      <Footer />
    </Container>
  );
}

export default SendTopupLayout;
