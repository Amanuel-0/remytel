import React from "react";
import Image from "next/image";
import Card from "@/components/card";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import IconButton from "@/components/ui/icon-button";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

function SettingsEdit() {
  return (
    <div>
      <section className="my-5 flex w-full flex-col gap-5 md:flex-row md:justify-between">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            <button className="flex h-11 w-11  min-w-12 items-center justify-center rounded-full bg-white">
              <Image
                src={"/assets/icons/arrow-back-black-icon.svg"}
                alt={"arrow-back-black-icon"}
                width={16}
                height={16}
              />
            </button>
            <Textt variant="h6-satoshi" className="hidden md:block">
              My Account
            </Textt>
          </div>

          <div>
            <MyButton
              variant="primary-gradient-top-left"
              className="min-w-[125px]"
            >
              <Textt
                variant="span1-satoshi"
                className="font-extrabold text-white"
              >
                Send top-up
              </Textt>
            </MyButton>
          </div>
        </div>
      </section>

      <section className="my-[10px] flex h-full w-full flex-col gap-[10px] md:flex-row">
        <Card className="w-full md:max-w-[65%]">
          <div className="mt-2 flex items-center justify-between">
            <Textt variant="h3-craftwork" className="text-start">
              Personal Details
            </Textt>
          </div>

          <div className="mt-5">
            {/* form */}
            <form>
              <div className="flex justify-between gap-5">
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  className="block h-[54px] w-full rounded-full border border-[#DBDBDB] px-5 py-3 font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]"
                />
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  className="block h-[54px] w-full rounded-full border border-[#DBDBDB] px-5 py-3 font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]"
                />
              </div>

              {/* date */}
              <div className="mt-5 flex justify-between gap-5">
                {/* day */}
                <select
                  id="day"
                  name="day"
                  className="block h-[54px] w-full rounded-full border border-[#DBDBDB] bg-transparent px-5 py-3 font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]"
                >
                  <option selected>Date</option>
                  {/* // make the year to be from 1900 upto current year options */}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>

                {/* month */}
                <select
                  id="month"
                  name="month"
                  className="block h-[54px] w-full rounded-full border border-[#DBDBDB] bg-transparent px-5 py-3 font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]"
                >
                  <option selected>Month</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

                {/* year */}
                <select
                  id="year"
                  name="year"
                  className="block h-[54px] w-full rounded-full border border-[#DBDBDB] bg-transparent px-5 py-3 font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]"
                >
                  <option selected>Year</option>
                  {/* Generate year options from 1900 to the current year */}
                  {Array.from(
                    { length: new Date().getFullYear() - 1900 + 1 },
                    (_, i) => i + 1900,
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <input
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                className="mt-5 block h-[54px] w-full rounded-full border border-[#DBDBDB] px-5 py-3 font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]"
              />

              {/* input for phone */}
              <input
                id="phone"
                type="tel"
                placeholder="Phone"
                name="phone"
                className="mt-5 block h-[54px] w-full rounded-full border border-[#DBDBDB] px-5 py-3 font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]"
              />

              <Textt variant="span2-satoshi" className="py-5 text-start">
                {"We care about your data and it's only used in line With our "}
                <Link
                  href={"#"}
                  className="inline-block text-start text-primary"
                >
                  Privacy notice
                </Link>
              </Textt>

              <div className="flex justify-start gap-3">
                <MyButton variant="primary-normal" className="max-w-[145px]">
                  <Textt
                    variant="span1-satoshi"
                    className="font-extrabold text-white"
                  >
                    Save
                  </Textt>
                </MyButton>
                <MyButton variant="light-normal" className="max-w-[145px]">
                  <Textt variant="span1-satoshi" className="font-extrabold">
                    Cancel
                  </Textt>
                </MyButton>
              </div>
            </form>
          </div>
        </Card>

        {/* Payment Methods */}
        <div className="w-full md:max-w-[35%]">
          <Card className="mb-[10px] h-full w-full">
            <Textt variant="h3-craftwork" className="text-start">
              Payment methods
            </Textt>

            <div className="mt-5 rounded-[10px] border border-[#DBDBDB] p-5">
              <div className="mt-3">
                <div className="flex items-center justify-between py-1 md:justify-start">
                  <Textt variant="span2-satoshi" className="text-start">
                    Card Number
                  </Textt>

                  <Textt variant="span1-satoshi" className="text-start">
                    **** 3456
                  </Textt>
                </div>
                <div className="flex items-center justify-between py-1 md:justify-start">
                  <Textt variant="span2-satoshi" className="text-start">
                    Expiry Date
                  </Textt>

                  <Textt variant="span1-satoshi" className="text-start">
                    05/28
                  </Textt>
                </div>
              </div>

              {/* date */}
              <div className="mt-5 flex justify-between gap-5">
                {/* month */}
                <select
                  id="month"
                  name="month"
                  className="block h-[54px] w-full rounded-full border border-[#DBDBDB] bg-transparent px-5 py-3 font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]"
                >
                  <option selected>Month</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

                {/* year */}
                <select
                  id="year"
                  name="year"
                  className="block h-[54px] w-full rounded-full border border-[#DBDBDB] bg-transparent px-5 py-3 font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]"
                >
                  <option selected>Year</option>
                  {/* Generate year options from 1900 to the current year */}
                  {Array.from(
                    { length: new Date().getFullYear() - 1900 + 1 },
                    (_, i) => i + 1900,
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 flex justify-start gap-3">
                <MyButton variant="primary-normal" className="max-w-[145px]">
                  <Textt
                    variant="span1-satoshi"
                    className="font-extrabold text-white"
                  >
                    Save
                  </Textt>
                </MyButton>
                <MyButton variant="light-normal" className="max-w-[145px]">
                  <Textt variant="span1-satoshi" className="font-extrabold">
                    Cancel
                  </Textt>
                </MyButton>
              </div>

              {/* remove */}
              <button
                type="button"
                className="text-danger mt-5 h-full max-h-[54px] min-h-[44px] w-full max-w-[145px] rounded-full border border-[#F39191] bg-[#FFE8E8]"
              >
                <Textt
                  variant="span1-satoshi"
                  className="font-extrabold text-[#CE2424]"
                >
                  Remove card
                </Textt>
              </button>
            </div>
          </Card>
        </div>
      </section>

      {/* preferences */}
      <Card className="mb-[10px] h-full w-full">
        <Textt variant="h3-craftwork" className="text-start">
          Contact Preferences
        </Textt>

        <div className="mt-5">
          <div className="flex flex-col items-center justify-between gap-4 border-b border-b-[#D0D0D0] py-4 md:flex-row md:gap-0">
            <Textt variant="span1-satoshi" className="max-w-[390px] text-start">
              Let me know about relevant and exclusive Ding discounts and
              promotions, especially for me.
            </Textt>
            <div className="flex gap-10 md:pr-24">
              <div className="flex items-center justify-start gap-7">
                <label htmlFor="id">Email</label>
                <Switch id="email" />
              </div>

              <div className="flex items-center justify-start gap-7">
                <label htmlFor="id">SMS</label>
                <Switch id="email" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row md:gap-0">
            <Textt variant="span1-satoshi" className="max-w-[390px] text-start">
              Show/Hide my name in text messages, notifications and emails sent
              to other Ding users.
            </Textt>
            <div className="flex items-center justify-start gap-7 md:pr-24">
              <label htmlFor="id">Show</label>
              <Switch id="email" defaultChecked />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SettingsEdit;
