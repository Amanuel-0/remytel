import Card from "@/components/card";
import { LoadingSpinner } from "@/components/loading-spinner";
import Textt from "@/components/text";
import contactsContext from "@/states/contacts-context";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import stc from "string-to-color";

export const ContactsCard = ({
  setOpenSaveContactModal,
}: {
  setOpenSaveContactModal: (opern: boolean) => void;
}) => {
  const { contacts, loading } = useContext(contactsContext);
  if (loading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  return (
    <Card className="mb-[10px] w-full">
      <div className="mt-2 flex items-center justify-between">
        <Textt variant="h4-craftwork" className="text-start">
          Contacts
        </Textt>

        {contacts?.items?.length > 0 && (
          <Link
            href={"/account/contacts"}
            className="flex items-center justify-center gap-[10px]"
          >
            <Textt variant="span1-satoshi">All Contacts</Textt>
            <Image
              src={"/assets/icons/arrow-right-thin-black.svg"}
              alt={"arrow-right-black-icon"}
              width={12}
              height={12}
            />
          </Link>
        )}
      </div>

      <div className="mt-5 flex items-center justify-start gap-2 overflow-auto">
        {contacts?.items?.length === 0 && (
          <div>
            <Textt
              variant="span1-craftwork"
              className="mt-3 text-start font-medium text-[#1D3462]"
            >
              Send a little happiness easily to your loved ones
            </Textt>

            <button
              type="button"
              onClick={() => setOpenSaveContactModal(true)}
              className="mt-5 flex items-center justify-center gap-2"
            >
              <Textt variant="span1-satoshi" className=" text-primary">
                Add Contact
              </Textt>

              <Image
                src={"/assets/icons/add-green-icon.svg"}
                className="-red-500"
                alt={"contacts-icon"}
                width={11}
                height={11}
              />
            </button>
          </div>
        )}

        {contacts?.items?.length > 0 &&
          contacts?.items?.slice(0, 4)?.map?.((contact) => (
            <div
              className="flex h-[80px] w-[70px] flex-col items-center justify-between rounded-[15px] border border-[#F0F0F0] p-2"
              key={contact.id}
            >
              <div
                className={`flex h-[40px] w-[40px] items-center justify-center rounded-full  text-white`}
                style={{ background: stc(contact.name?.split?.(" ")?.[0]) }}
              >
                <Image
                  src={"/assets/icons/account-white.svg"}
                  alt={"account-white"}
                  width={16}
                  height={19}
                />
              </div>

              <Textt
                variant="span1-satoshi"
                className="w-full overflow-hidden overflow-ellipsis text-nowrap"
              >
                {contact.name?.split?.(" ")?.[0] || "-"}
              </Textt>
            </div>
          ))}
      </div>
    </Card>
  );
};
