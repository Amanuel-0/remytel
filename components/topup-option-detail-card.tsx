import React from "react";
import Card from "./card";
import Textt from "./text";
import IconButton from "./ui/icon-button";
import Image from "next/image";
import { Product } from "@/services";

interface TopupOptionDetailCardProps {
  product: Partial<Product>;
  onProductEdit: () => void;
}
function TopupOptionDetailCard({
  product,
  onProductEdit,
}: TopupOptionDetailCardProps) {
  return (
    <>
      <Card className="flex items-center justify-between">
        <span className="flex items-center justify-center gap-3">
          <Textt variant="h6-satoshi">{`You're senRemytel`}</Textt>
          <Textt variant="h6-satoshi" className="text-primary">
            {product.amount} ETB
          </Textt>
        </span>

        <IconButton className="h-8 w-8" onClick={() => onProductEdit()}>
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
