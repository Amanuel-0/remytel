"use client";
import React, { useContext, useEffect, useState } from "react";
import Card from "@/components/card";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import AccountNav from "../../account-nav";
import userContext from "@/states/user-context";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/services";
import { editProfile } from "@/services/profile.service";
import { toast } from "sonner";
import withAuth from "@/components/protected-route";

function SettingsEdit() {
  const {
    user: { user, token },
    onUser,
  } = useContext(userContext);

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    user.notificationsEnabled,
  );

  const [personalDetails, setPersonalDetails] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    phoneNumber: string;
    day: number | undefined;
    month: number | undefined;
    year: number | undefined;
  }>({
    first_name: "",
    last_name: "",
    email: "",
    phoneNumber: "",
    day: undefined,
    month: undefined,
    year: undefined,
  });
  const router = useRouter();

  useEffect(() => {
    setPersonalDetails({
      first_name: user?.firstName || "",
      last_name: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      day: undefined,
      month: undefined,
      year: undefined,
      // day: user?.day || "",
      // month: user?.month || "",
      // year: user?.year || "",
    });
  }, [user]);

  // requests
  const updatePersonalDetails = async (e: any) => {
    e.preventDefault();

    const response = await editProfile(token, {
      first_name: personalDetails.first_name,
      last_name: personalDetails.last_name,
      email: personalDetails.email,
      promoOptIn: notificationsEnabled,
    });

    if (response) {
      onUser({ token: token, user: { ...user, ...response } });
      toast.success("Profile has been updated");
    }
  };

  //
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({ ...prev, [name]: value }));
  };
  const toggleNotificationPreference = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const navigateToSettings = () => {
    router.push("/account/settings");
  };

  return (
    <div>
      <AccountNav />

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
                  name="first_name"
                  value={personalDetails.first_name}
                  onChange={(e) => handleChange(e)}
                  className="block h-[54px] w-full rounded-full border border-[#DBDBDB] px-5 py-3 font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]"
                />
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  value={personalDetails.last_name}
                  onChange={(e) => handleChange(e)}
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
                  <option selected={!Boolean(personalDetails.day)}>Date</option>
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
                  {/* // make the year to be from 1900 upto current year options */}
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
                value={personalDetails.email}
                onChange={(e) => handleChange(e)}
                className="mt-5 block h-[54px] w-full rounded-full border border-[#DBDBDB] px-5 py-3 font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080]"
              />

              {/* input for phone */}
              <input
                id="phoneNumber"
                type="tel"
                placeholder="PhoneNumber"
                name="phoneNumber"
                value={personalDetails.phoneNumber}
                onChange={(e) => handleChange(e)}
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
                <MyButton
                  type="button"
                  variant="primary-normal"
                  className="max-w-[145px]"
                  onClick={updatePersonalDetails}
                >
                  <Textt
                    variant="span1-satoshi"
                    className="font-extrabold text-white"
                  >
                    Save
                  </Textt>
                </MyButton>
                <MyButton
                  type="button"
                  onClick={navigateToSettings}
                  variant="light-normal"
                  className="max-w-[145px]"
                >
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
                  <option selected={!Boolean(personalDetails.month)}>
                    Month
                  </option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option
                      key={month}
                      value={month}
                      selected={!!personalDetails.month}
                    >
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
                  <option selected={!Boolean(personalDetails.year)}>
                    Year
                  </option>
                  {/* Generate year options from 1900 to the current year */}
                  {Array.from(
                    { length: new Date().getFullYear() - 1900 + 1 },
                    (_, i) => i + 1900,
                  ).map((year) => (
                    <option
                      key={year}
                      value={year}
                      selected={!!personalDetails.year}
                    >
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
                <MyButton
                  type="button"
                  onClick={navigateToSettings}
                  variant="light-normal"
                  className="max-w-[145px]"
                >
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
              <Switch
                id="email"
                checked={notificationsEnabled}
                onClick={toggleNotificationPreference}
                // onChange={toggleNotificationPreference}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default withAuth(SettingsEdit);
