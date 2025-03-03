import { FileQuestion, Timer } from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

const currentYear = new Date().getFullYear();

// export const years = Array.from(
//   { length: currentYear - 2024 + 1 },
//   (_, index) => {
//     const year = (2024 + index).toString();
//     return {
//       value: Number(year),
//       label: Number(year),
//       color: "#5A5A5A",
//       icon: Timer,
//     };
//   }
// );
export const years = [
  {
    value: currentYear,
    label: currentYear,
    color: "#5A5A5A",
    icon: Timer,
  },
];

export const accountType = [
  {
    value: "Deposit Account",
    label: "Deposit Account",
    color: "#5A5A5A",
    // icon: QuestionMarkCircledIcon,
  },
  {
    value: "Fixed Time Deposit Account",
    label: "Fixed Time Deposit Account",
    color: "#5A5A5A",
    // icon: StopwatchIcon,
  },
  {
    value: "Non-Repatriable Birr Account",
    label: "Non-Repatriable Birr Account",
    color: "#5A5A5A",
    // icon: StopwatchIcon,
  },
  {
    value: "ECOLFL",
    label: "ECOLFL",
    color: "#5A5A5A",
    // icon: StopwatchIcon,
  },
  {
    value: "Diaspora Wadia Saving Account",
    label: "Diaspora Wadia Saving Account",
    color: "#5A5A5A",
    // icon: StopwatchIcon,
  },
  {
    value: "Diaspora Mudarabah Saving Account",
    label: "Diaspora Mudarabah Saving Account",
    color: "#5A5A5A",
    // icon: StopwatchIcon,
  },
  {
    value: "Diaspora Mudarabah Fixed Time",
    label: "Diaspora Mudarabah Fixed Time",
    color: "#5A5A5A",
    // icon: StopwatchIcon,
  },
];

export const sex = [
  {
    value: "MALE",
    label: "Male",
    color: "#5A5A5A",
    icon: FileQuestion,
  },
  {
    value: "FEMALE",
    label: "Female",
    color: "#5A5A5A",
    icon: FileQuestion,
  },
];

export const months = [
  {
    value: "JANUARY",
    label: "JANUARY",
    color: "#5A5A5A",
    // icon: MONTH,
  },
  {
    value: "FEBRUARY",
    label: "FEBRUARY",
    color: "#5A5A5A",
    // icon: FileQuestion,
  },
  {
    value: "MARCH",
    label: "MARCH",
    color: "#5A5A5A",
    // icon: FileQuestion,
  },
  {
    value: "APRIL",
    label: "APRIL",
    color: "#5A5A5A",
    // icon: FileQuestion,
  },
  {
    value: "MAY",
    label: "MAY",
    color: "#5A5A5A",
    // icon: FileQuestion,
  },
  {
    value: "JUNE",
    label: "JUNE",
    color: "#5A5A5A",
    // icon: FileQuestion,
  },
  {
    value: "JULY",
    label: "JULY",
    color: "#5A5A5A",
    // icon: FileQuestion,
  },
  {
    value: "AUGUST",
    label: "AUGUST",
    color: "#5A5A5A",
    // icon: FileQuestion,
  },
  {
    value: "SEPTEMBER",
    label: "SEPTEMBER",
    color: "#5A5A5A",
    // icon: FileQuestion,
  },
  {
    value: "OCTOBER",
    label: "OCTOBER",
    color: "#5A5A5A",
    // icon: FileQuestion,
  },
  {
    value: "NOVEMBER",
    label: "NOVEMBER",
    color: "#5A5A5A",
    // icon: FileQuestion,
  },
  {
    value: "DECEMBER",
    label: "DECEMBER",
    color: "#5A5A5A",
    // icon: FileQuestion,
  },
];

export const completed = [
  {
    value: "20%",
    label: "20%",
    color: "#5A5A5A",
    // icon: QuestionMarkCircledIcon,
  },
  {
    value: "40%",
    label: "40%",
    color: "#5A5A5A",
    // icon: QuestionMarkCircledIcon,
  },
  {
    value: "60%",
    label: "60%",
    color: "#5A5A5A",
    // icon: QuestionMarkCircledIcon,
  },
  {
    value: "80%",
    label: "80%",
    color: "#5A5A5A",
    // icon: QuestionMarkCircledIcon,
  },
  {
    value: "100%",
    label: "100%",
    color: "#5A5A5A",
    // icon: QuestionMarkCircledIcon,
  },
];

export const statuses = [
  {
    value: "pending",
    label: "Pending",
    color: "#5A5A5A",
    icon: FileQuestion,
  },
  {
    value: "confirmed",
    label: "Confirmed",
    color: "#5A5A5A",
    icon: FileQuestion,
  },
  {
    value: "preparing",
    label: "Preparing",
    color: "#5A5A5A",
    icon: FileQuestion,
  },
  {
    value: "out_for_delivery",
    label: "Out For Delivery",
    color: "#5A5A5A",
    icon: FileQuestion,
  },
  {
    value: "delivered",
    label: "Delivered",
    color: "#0000FF",
    icon: FileQuestion,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    color: "#FF0000",
    icon: FileQuestion,
  },
];

export const userStatus = [
  {
    value: "PENDING",
    label: "PENDING",
    color: "#5A5A5A",
    icon: FileQuestion,
  },
  {
    value: "ACTIVE",
    label: "ACTIVE",
    color: "#0000FF",
    icon: FileQuestion,
  },
  {
    value: "BANNED",
    label: "BANNED",
    color: "#FF0000",
    icon: FileQuestion,
  },
];

export const operations = [
  {
    label: "FT",
    value: "ft",
    icon: FileQuestion,
  },
  {
    label: "FT Reversal",
    value: "ft reversal",
    icon: FileQuestion,
  },
  {
    label: "FT Reversal ND",
    value: "ft reversal next day",
    icon: FileQuestion,
  },
  {
    label: "FT Lump Sum",
    value: "ft lump sum",
    icon: FileQuestion,
  },
  {
    label: "FT Interest",
    value: "ft interest",
    icon: FileQuestion,
  },
];
