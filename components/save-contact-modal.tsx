"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import ModalWrapper from "./modal-wrapper";
import Textt from "./text";
import MyButton from "./ui/my-button";
import { useSearchParams } from "next/navigation";
import { isPhoneValid } from "@/utils";
import { createContact } from "@/services/contact.service";
import userContext from "@/states/user-context";
import { toast } from "sonner";

function SaveContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user } = useContext(userContext);
  const [contactName, setContactName] = useState<string>("");
  const [contactNameValid, setContactNameValid] = useState<boolean>(false);
  const [contactNameTouched, setContactNameTouched] = useState<boolean>(false);
  const [contactPhoneNumber, setContactPhoneNumber] = useState<string>("");
  const [contactPhoneNumberValid, setContactPhoneNumberValid] =
    useState<boolean>(false);
  const [contactPhoneNumberTouched, setContactPhoneNumberTouched] =
    useState<boolean>(false);

  const searchParams = useSearchParams();
  const [saving, setSaving] = useState(false);

  // const receiverPhone = searchParams.get("to") || "";
  // const [receiverName, setReceiverName] = useState<string>("");

  const handleContactNameChange = (e: any) => {
    e.preventDefault();
    if (e.target.value.length > 3) {
      setContactNameValid(true);
    } else {
      setContactNameValid(false);
    }
    setContactName(e.target.value);
  };
  const handleContactPhoneNumberChange = (e: any) => {
    e.preventDefault();
    if (isPhoneValid(e.target.value)) {
      setContactPhoneNumberValid(true);
    } else {
      setContactPhoneNumberValid(false);
    }
    setContactPhoneNumber(e.target.value);
  };

  const saveContact = async () => {
    if (!contactNameValid || !contactPhoneNumberValid) {
      setContactNameTouched(true);
      setContactPhoneNumberTouched(true);
      return;
    }
    setSaving(true);

    // todo: save contact
    try {
      const contactRes = await createContact(
        { name: contactName, phoneNumber: contactPhoneNumber },
        user.token,
      );
      toast.success(
        <p className="text-green-700">
          &quot;{contactRes.name}&quot; saved successfully
        </p>,
      );
      onClose();
    } catch (err: any) {
      toast.error(<p className="text-red-700">{err?.response?.data?.error}</p>);
    } finally {
      setSaving(false);
    }

    // console.log("Save Contact/Receiver", receiverName, receiverPhone);
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <div className="w-full max-w-[466px]">
        <div className="flex items-center justify-between">
          <div>
            <span className="flex items-center justify-center gap-3">
              <Image
                src={"/assets/images/flags/ethiopian-flag.png"}
                alt="ethiopian-flag"
                width={30}
                height={30}
              />
              <Textt variant="h6-satoshi">
                {/* {receiverPhone} */}
                Add Contact
              </Textt>
              {/* <Image
                src={"/assets/images/ethiotel-logo.svg"}
                alt="ethiotel-logo"
                width={55}
                height={14}
              /> */}
            </span>
          </div>
        </div>

        <div>
          <div>
            <input
              id="contactName"
              type="text"
              placeholder="Contact Name"
              value={contactName}
              onChange={(e) => handleContactNameChange(e)}
              className="mt-4 block h-[44px] w-full rounded-[36px] border border-[#DBDBDB] p-3  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#808080] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
            />

            {contactNameTouched && !contactNameValid && (
              <small className="text-xs text-red-500">
                Contact name is not valid
              </small>
            )}
          </div>

          <div>
            <input
              id="contactPhoneNumber"
              type="tel"
              placeholder="Phone Number"
              value={contactPhoneNumber}
              onChange={(e) => handleContactPhoneNumberChange(e)}
              className="mt-4 block h-[44px] w-full rounded-[36px] border border-[#DBDBDB] p-3  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#808080] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
            />

            {contactPhoneNumber && !contactPhoneNumberValid && (
              <small className="text-xs text-red-500">
                Phone number is not valid
              </small>
            )}
          </div>

          <MyButton
            variant="primary-normal"
            className="mt-2"
            onClick={saveContact}
            disabled={saving}
          >
            <Textt variant="h5-satoshi" className="text-white">
              Save Contact
            </Textt>
          </MyButton>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default SaveContactModal;
