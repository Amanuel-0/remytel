import { Product } from "@/models";

export type SubscriptionT = {
  id: string;
  profileId: string;
  planId: string;
  type: "WEEKLY" | "MONTHLY" | "BIWEEKLY";
  receiver: string;
  receiverName: string;
  interval: string;
  intervalCount: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  stripeSubscriptionId: string | null;
  product?: Product;
};
export type SubscriptionHistoryResT = {
  metadata: {
    total: number;
    page: number;
    size: number;
    hasNext: number;
    hasPrev: number;
  };
  items: SubscriptionT[];
};

export type OrderT = {};

export type OrderHistoryResT = {
  metadata: {
    total: number;
    page: number;
    size: number;
    hasNext: number;
    hasPrev: number;
  };
  items: OrderT[];
};

export const SubscriptionTypeMap = {
  WEEKLY: "7",
  BIWEEKLY: "14",
  MONTHLY: "30",
};
