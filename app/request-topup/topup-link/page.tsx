"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import React, { useContext } from "react";
import Image from "next/image";
import CopyToClipboardBtn from "@/components/ui/copy-to-clipboard-btn";
import ModalWrapper from "@/components/modal-wrapper";
import userContext from "@/states/user-context";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import withAuth from "@/components/protected-route";

function TopupLink() {
  const { user, onUser } = useContext(userContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const topupLinkURL = searchParams.get("topup-link");

  const onCopyLinkCopied = () => {
    // console.log("Link copied");
    setTimeout(() => {
      console.log("Link copied");
      router.push("/request-topup/success");
    }, 1000);
  };

  return (
    <>
      <Card>
        <Textt variant="h4-satoshi" className="pt-[10px] text-start">
          Your top-up link is ready to be shared!
        </Textt>

        <Textt
          variant="span2-satoshi"
          className="mt-8"
        >{`You can now share it with your friends and family to ask for top-up`}</Textt>

        <Textt variant="span1-satoshi" className="my-2">
          These are your details:{" "}
        </Textt>

        <div className="my-8 flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Textt variant="h3-satoshi" className="text-white">
              O
            </Textt>
          </div>
          <Textt variant="h3-satoshi">Oumer Sualih</Textt>
        </div>

        <div>
          <span className="flex items-center justify-center gap-3">
            <Image
              src={"/assets/images/flags/ethiopian-flag.png"}
              alt="ethiopian-flag"
              width={30}
              height={30}
            />
            <Textt variant="span1-satoshi">
              {user.user.phoneNumber}
              {/* +251 93 542 5899 */}
            </Textt>

            <Image
              src={"/assets/icons/check-icon.svg"}
              alt="check-logo"
              width={20}
              height={19}
            />
          </span>
        </div>

        <Textt variant="span2-satoshi" className="mt-2">
          Ethiotelecom
        </Textt>

        <div className="my-8 flex items-center justify-center gap-2">
          <div className="rounded-lg border border-[#ECECEC] p-2">
            <Textt variant="span2-satoshi" className="underline">
              {topupLinkURL}
            </Textt>
          </div>

          <CopyToClipboardBtn
            onClick={onCopyLinkCopied}
            variant="icon-btn"
            textToCopy={topupLinkURL}
          ></CopyToClipboardBtn>
        </div>

        <CopyToClipboardBtn
          textToCopy={topupLinkURL}
          onClick={onCopyLinkCopied}
        >
          Copy Link
        </CopyToClipboardBtn>
      </Card>

      {/* todo: text copied notification */}
    </>
  );
}

export default withAuth(TopupLink);
