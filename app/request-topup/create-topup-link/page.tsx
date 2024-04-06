"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import useCreateQueryString from "@/hooks/use-create-query-params";
import { getProfile, updateProfile } from "@/services";
import { createTopupRequest } from "@/services/request.service";
import userContext from "@/states/user-context";
import { validateEmail } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import withAuth from "@/components/protected-route";

function CreateTopupLink() {
  const { user, onUser } = useContext(userContext);
  const [subscription, setSubscription] = React.useState<"yes" | "no">("yes"); // ["yes", "no"]
  //
  const [name, setName] = React.useState("");
  const [nameValid, setNameValid] = React.useState(false);
  const [nameTouched, setNameTouched] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(false);
  const [emailTouched, setEmailTouched] = React.useState(false);
  //
  const [link, setLink] = React.useState("");
  //
  const { createQueryString } = useCreateQueryString();
  const router = useRouter();

  const handleNameChange = (e: any) => {
    e.preventDefault();
    if (e.target.value.length > 3) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
    setName(e.target.value);
  };
  const handleEmailChange = (e: any) => {
    e.preventDefault();
    if (validateEmail(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (!nameValid || !emailValid) {
      setNameTouched(true);
      setEmailTouched(true);
      return;
    }
    // console.log("name", name, "email", email);

    // update profile
    const profile = await updateProfile(
      {
        first_name: name,
        email,
      },
      user.token,
    );
    // update the user context
    if (profile) {
      onUser({ ...user, ...profile });
    }

    // create topup link
    const topupLinkData = await createTopupRequest(
      {
        senderPhoneNumber: user.user.phoneNumber,
        code: "et",
      },
      user.token,
    );
    // get the topup link
    if (topupLinkData) {
      setLink(topupLinkData.url);
    }

    if (topupLinkData) {
      router.push(
        `/request-topup/topup-link?${createQueryString([{ name: "topup-link", value: topupLinkData.url }])}`,
      );
    }
  };

  useEffect(() => {
    console.log("subscription", subscription);
  }, [subscription]);

  return (
    <Card>
      <Textt variant="h4-satoshi" className="pt-[10px]">
        What is your Name
      </Textt>

      <Textt
        variant="span2-satoshi"
        className="mt-8 text-start"
      >{`Add your name so people know it's you`}</Textt>
      <div>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => handleNameChange(e)}
          placeholder="Your Name"
          className="mt-[10px] block h-[54px] w-full rounded-[36px] border border-[#DBDBDB] p-3  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
        />

        {nameTouched && !nameValid && (
          <small className="text-xs text-red-500">Name is not valid</small>
        )}
      </div>

      <div>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => handleEmailChange(e)}
          placeholder="Your Email Address"
          className="mt-2 block h-[54px] w-full rounded-[36px] border border-[#DBDBDB] p-3  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
        />
        {emailTouched && !emailValid && (
          <small className="text-xs text-red-500">Email is not valid</small>
        )}
      </div>

      <Textt variant="span1-satoshi" className="mb-5 mt-[10px] text-start">
        {`I'd like to receive discounts, exclusive special offers and other
 updates from Topup.et via e-mail and SMS.`}
      </Textt>

      {/*  */}
      {subscription && (
        <div>
          {/* radio start */}
          <div className="inline-flex items-center">
            <label
              className="relative flex cursor-pointer items-center rounded-full p-3"
              htmlFor="green"
            >
              <input
                name="subscription"
                type="radio"
                className="before:content[''] before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-[#808080] text-green-500 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-[10px] checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                id="green"
                checked={subscription === "yes"}
                // onClick={(e) => setSubscription("yes")}
                onChange={(e) => setSubscription("yes")}
                // defaultChecked={true}
              />
              <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="6"></circle>
                </svg>
              </span>
            </label>

            <Textt variant="span2-satoshi">Yes</Textt>
          </div>
          {/* radio end */}

          {/* radio start */}
          <div className="inline-flex items-center">
            <label
              className="relative flex cursor-pointer items-center rounded-full p-3"
              htmlFor="green"
            >
              <input
                name="subscription"
                type="radio"
                className="before:content[''] before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-[#808080] text-primary transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-[10px] checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                id="green"
                checked={subscription === "no"}
                // onClick={(e) => setSubscription("no")}
                onChange={(e) => setSubscription("no")}
              />
              <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="6"></circle>
                </svg>
              </span>
            </label>
            <Textt variant="span2-satoshi">No</Textt>
          </div>
          {/* radio end */}
        </div>
      )}

      <MyButton
        type="button"
        variant="primary-normal"
        className="my-4"
        onClick={handleSubmit}
      >
        <Textt variant="h5-satoshi" className="text-white">
          Create My Top-Up link
        </Textt>
      </MyButton>
    </Card>
  );
}

export default withAuth(CreateTopupLink);
