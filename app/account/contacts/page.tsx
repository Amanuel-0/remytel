"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import Card from "@/components/card";
import IconButton from "@/components/ui/icon-button";
import withAuth from "@/components/protected-route";
import AccountNav from "../account-nav";
import contactsContext from "@/states/contacts-context";
import stc from "string-to-color";
import sendTopupContext from "@/states/send-topup-context";
import { useRouter } from "next/navigation";
import userContext from "@/states/user-context";
import SaveContactModal from "@/components/save-contact-modal";

function Contacts() {
  const { contacts, refetch } = useContext(contactsContext);
  const [searchQuery, setSearchQuery] = useState("");
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const router = useRouter();
  const {
    user: { user },
  } = useContext(userContext);
  const onResend = (id: string) => {
    setSendTopup({
      from: user.phoneNumber,
      product: undefined,
      to: contacts?.items?.filter((c) => c.id == id)?.[0]
        ?.phoneNumber as string,
      topupFrequency: undefined,
      fromCountryCode: "US",
    });
    router.push(`/send-topup/options?selectedOption`);
  };
  const [openSaveContactModal, setOpenSaveContactModal] = React.useState(false);

  return (
    <div>
      <SaveContactModal
        open={openSaveContactModal}
        onClose={() => {
          setOpenSaveContactModal(false);
          refetch();
        }}
      />
      <AccountNav />

      <section className="my-[10px] flex h-full w-full flex-col gap-[10px] md:flex-row">
        <Card className="w-full p-[30px]">
          <Textt variant="h3-craftwork" className="text-start">
            Contacts
          </Textt>

          <MyButton
            variant="primary-normal"
            className="mt-4 flex h-max w-max items-center justify-center gap-2 px-4"
            onClick={() => setOpenSaveContactModal(true)}
          >
            <Image
              src="/assets/icons/person-icon.svg"
              alt="search-icon"
              width={16}
              height={16}
            />
            Add Contact
          </MyButton>
          {/* search */}
          <div className="mt-5">
            <div className="relative ">
              <Image
                src="/assets/icons/search-icon.svg"
                alt="search-icon"
                width={16}
                height={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 transform"
              />

              <input
                id="searchContact"
                type="search"
                placeholder="Search contact"
                name="searchContact"
                className="mt-4 block h-[54px] w-full rounded-full border border-[#DBDBDB] p-3 pl-10  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.currentTarget.value);
                }}
              />
            </div>
          </div>

          {/* contact list */}
          <div className="mt-8">
            {/* header */}
            <div className="flex items-center justify-between">
              <Textt variant="span2-satoshi" className="text-start">
                Name
              </Textt>
              <Textt variant="span2-satoshi" className="text-start">
                Phone Number
              </Textt>
              <div className="hidden md:block" />
            </div>

            {/* body */}
            {contacts?.items
              ?.filter((c) => c.name.includes(searchQuery))
              ?.map?.((contact, index) => (
                <div
                  key={contact.id}
                  className="my-5 flex flex-wrap items-center justify-between gap-4 md:flex-nowrap"
                >
                  <div className="flex w-1/2 items-center justify-start gap-5 md:w-full">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-white `}
                      style={{
                        background: stc(contact?.name?.split(" ")?.[0]),
                      }}
                    >
                      <Image
                        src={"/assets/icons/account-white.svg"}
                        alt={"account-white"}
                        width={16}
                        height={19}
                      />
                    </div>

                    <Textt variant="h6-satoshi" className="text-start">
                      {contact.name}
                    </Textt>
                  </div>

                  {/* phone */}
                  <div>
                    <Textt
                      variant="span1-satoshi"
                      className="w-1/2 text-start md:w-full"
                    >
                      {contact.phoneNumber}
                    </Textt>
                  </div>

                  <div className="flex w-full md:justify-end">
                    <MyButton
                      variant="primary-normal"
                      className="max-w-[145px]"
                      onClick={() => {
                        onResend(contact.id);
                      }}
                    >
                      <Textt variant="span1-satoshi" className="text-white">
                        Send top-up
                      </Textt>
                    </MyButton>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

export default withAuth(Contacts);
