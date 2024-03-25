import React from "react";
import Card from "./card";
import Textt from "./text";
import IconButton from "./ui/icon-button";
import Image from "next/image";

function TopupOptionDetailCard() {
  return (
    <>
      <Card className="flex items-center justify-between">
        <span className="flex items-center justify-center gap-3">
          <Textt variant="h6-satoshi">{`You're senRemytel`}</Textt>
          <Textt variant="h6-satoshi" className="text-primary">
            {` 138`} ETB
          </Textt>
        </span>

        <IconButton className="h-8 w-8">
          <Image
            src={"/assets/icons/edit-icon.svg"}
            alt={"edit-icon"}
            width={14}
            height={14}
          />
        </IconButton>
      </Card>
    </>
  );
}

export default TopupOptionDetailCard;
