"use client";
import React from "react";
import Card from "./card";
import Textt from "./text";
import IconButton from "./ui/icon-button";
import Image from "next/image";
import ModalWrapper from "./modal-wrapper";
import EditReceiverPhoneModal from "./edit-receiver-phone-modal";

interface TopupToDetailCardProps {
  phone: string;
  onPhoneEdit: () => void;
}
function TopupToDetailCard({ phone, onPhoneEdit }: TopupToDetailCardProps) {
  const [openEditPhoneModal, setOpenEditPhoneModal] = React.useState(false);

  return (
    <>
      <Card className="flex items-center justify-between">
        <div>
          <span className="flex items-center justify-center gap-3">
            <Image
              src={"/assets/images/flags/ethiopian-flag.png"}
              alt="ethiopian-flag"
              width={30}
              height={30}
            />
            <Textt variant="h6-satoshi">{phone}</Textt>
            {/* <Textt variant="h6-satoshi">+251 93 542 5899</Textt> */}

            <Image
              src={"/assets/images/ethiotel-logo.svg"}
              alt="ethiotel-logo"
              width={55}
              height={14}
            />
          </span>
        </div>

        <IconButton
          className="h-8 w-8"
          onClick={() => setOpenEditPhoneModal(true)}
        >
          {/* <IconButton className="h-8 w-8" onClick={onPhoneEdit}> */}
          <Image
            src={"/assets/icons/edit-icon.svg"}
            alt={"edit-icon"}
            width={14}
            height={14}
          />
        </IconButton>
      </Card>

      {/* edit phone modal */}
      <EditReceiverPhoneModal
        open={openEditPhoneModal}
        onClose={() => setOpenEditPhoneModal(false)}
      />
    </>
  );
}

export default TopupToDetailCard;
