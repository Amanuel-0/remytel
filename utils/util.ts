import { SubscriptionTypeMap } from "@/services/type";
import moment from "moment";

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}
export const nextBIllingDate = (
  createdAt: Date,
  type: "MONTHLY" | "WEEKLY" | "BIWEEKLY",
) => {
  const startDate = moment(createdAt);
  const datesPassed = moment().diff(startDate, "days");
  let daysRemainingForNextBill = 0;
  let daysPassedAfterLastBill = 0;
  const freq = parseInt(SubscriptionTypeMap[type]) || 0;
  daysPassedAfterLastBill = datesPassed % freq;
  daysRemainingForNextBill = freq - daysPassedAfterLastBill;
  return moment().add(daysRemainingForNextBill, "days").format("D / M / YYYY");
};
