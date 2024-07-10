"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import MyButton from "@/components/ui/my-button";
import { editProfile } from "@/services/profile.service";
import sendTopupContext from "@/states/send-topup-context";
import userContext from "@/states/user-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CompleteProfilePage() {
  const searchParams = useSearchParams();
  const selectedOption = searchParams.get("selectedOption");
  const { sendTopup } = useContext(sendTopupContext);
  const {
    user: { user, token },
    onUser,
  } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();
  const navigateToTopUpOptions = () => {
    if (selectedOption) {
      router.push(`/send-topup/options?selectedOption=${selectedOption}`);
    } else {
      router.push(`/send-topup/options`);
    }
  };
  const updateUserInfo = useCallback(() => {
    if (token) {
      if (
        (user?.email || email?.length > 0) &&
        (user?.firstName || firstName?.length > 0) &&
        (user?.lastName || lastName?.length > 0)
      ) {
        editProfile(token, {
          email: user?.email || email,
          first_name: user?.firstName || firstName,
          last_name: user?.lastName || lastName,
          promoOptIn: user?.notificationsEnabled,
        })
          .then((d) => {
            onUser({ token, user: d });
          })
          .catch(() => {
            toast("Some error happened while trying to save your info");
          });
        navigateToTopUpOptions();
      } else {
        toast.error("Please fill out all fields", {
          descriptionClassName: "text-[red]",
        });
      }
    }
  }, [token, email, firstName, lastName, user]);
  const handleContinue = () => {
    updateUserInfo();
  };

  return (
    <>
      <Textt variant="h4-craftwork">You’re sennding Remytel top-up to</Textt>
      <div className="mt-5">
        <TopupToDetailCard phone={sendTopup.to} />
      </div>
      <Card className="mt-5  flex w-full flex-col  justify-between px-7 py-5 ">
        <Textt variant="h4-craftwork" className="my-4">
          Fill out your personal info
        </Textt>
        <div className="grid grid-cols-2 gap-2">
          {!user?.firstName && (
            <div
              className={`${user?.lastName && "col-span-2"} flex flex-col gap-2`}
            >
              <label htmlFor="infoFirstName" className="text-xs text-[#808080]">
                Enter your First Name
              </label>
              <input
                id="infoFirstName"
                type="text"
                placeholder="First Name"
                name="first_name"
                value={firstName}
                required
                onChange={(e) => {
                  setFirstName(e.currentTarget.value);
                }}
                className={` block w-full rounded-full border border-[#DBDBDB] px-5 py-3 font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]`}
              />
            </div>
          )}
          {!user?.lastName && !user?.firstName && (
            <div
              className={`${user?.firstName && "col-span-2"}  flex flex-col gap-2`}
            >
              <label htmlFor="infoLastName " className="text-xs text-[#808080]">
                Enter your Last Name
              </label>

              <input
                id="infoLastName"
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={lastName}
                required
                onChange={(e) => {
                  setLastName(e.currentTarget.value);
                }}
                className={`block  w-full rounded-full border border-[#DBDBDB] px-5 py-3 font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]`}
              />
            </div>
          )}
          {!user?.email && (
            <div className="col-span-2 my-3 flex flex-col gap-2">
              <label htmlFor="infoEmail " className="text-xs text-[#808080]">
                Enter your Email
              </label>

              <input
                id="infoEmail"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
                className="block  w-full rounded-full border border-[#DBDBDB] px-5 py-3 font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]"
              />
            </div>
          )}
        </div>
        <div className="mt-4">
          <MyButton
            variant="primary-normal"
            className="mt-[10px]"
            onClick={handleContinue}
          >
            <Textt variant="span2-satoshi" className="text-white">
              Continue
            </Textt>
          </MyButton>
          <MyButton
            onClick={navigateToTopUpOptions}
            className="mt-2 border border-gray-300 bg-white text-black transition-colors duration-300 hover:bg-black/5"
          >
            <Textt variant="span2-satoshi">Skip</Textt>
          </MyButton>
        </div>
      </Card>
    </>
  );
}
