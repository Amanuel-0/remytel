import Container from "@/components/container";
import FooterAlt from "@/components/footer-alt";
import Navbar from "@/components/navbar";
import React from "react";

function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-[#DDE1E9]">
        <Container>
          <Navbar />

          <section className="mb-10 mt-10 w-full md:mb-16 md:mt-[60px]">
            {children}
          </section>
        </Container>
      </div>

      <div className="bg-[#DDE1E9]">
        <FooterAlt />
      </div>
    </>
  );
}

export default AccountLayout;
