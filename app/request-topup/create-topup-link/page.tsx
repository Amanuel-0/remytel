import Card from "@/components/card";
import Textt from "@/components/text";
import Button from "@/components/ui/button";
import React from "react";

function CreateTopupLink() {
  return (
    <Card>
      <Textt variant="h4-satoshi" className="pt-[10px]">
        What is your Name
      </Textt>

      <Textt
        variant="span2-satoshi"
        className="mt-8 text-start"
      >{`Add your name so people know it's you`}</Textt>
      <input
        type="text"
        placeholder="Your Name"
        id="cardNumber"
        className="mt-[10px] block h-[54px] w-full rounded-2xl border border-[#DBDBDB] p-3  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
      />

      <input
        type="email"
        placeholder="Your Email Address"
        id="cardNumber"
        className="mt-2 block h-[54px] w-full rounded-2xl border border-[#DBDBDB] p-3  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
      />

      <Textt variant="span1-satoshi" className="mb-5 mt-[10px] text-start">
        {`I'd like to receive discounts, exclusive special offers and other
 updates from Topup.et via e-mail and SMS.`}
      </Textt>

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

      <Button variant="primary-normal" className="my-4">
        <Textt variant="h5-satoshi" className="text-white">
          Create My Top-Up link
        </Textt>
      </Button>
    </Card>
  );
}

export default CreateTopupLink;
