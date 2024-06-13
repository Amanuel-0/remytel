import axios from "axios";
import { API_URL } from ".";
import {
  IPageMetadata,
  IPageResponse,
  Transaction,
  UpdateProfilePayload,
  UserProfile,
} from "@/models";

//get order history
export const getOrderHistory = async (
  pageOption: { page: number; size: number },
  token: string,
): Promise<IPageResponse<Transaction>> => {
  const response = await axios.get(
    `${API_URL}profile/history?page=${pageOption.page}&size=${pageOption.size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data as IPageResponse<Transaction>;
};

// get order details
export const getOrderDetails = async (orderId: string, token: string) => {
  const response = await axios.get(`${API_URL}profile/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as Transaction;
};

// subscription history
export const getSubscriptionHistory = async (token: string) => {
  const response = await axios.get(`${API_URL}profile/subscriptions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// todo: stripe payment

// cancel subscription
export const cancelSubscription = async (
  token: string,
  subscriptionId: string,
) => {
  const response = await axios.delete(
    `${API_URL}profile/subscription/${subscriptionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// update profile
export const editProfile = async (
  token: string,
  updateProfilePayload: UpdateProfilePayload,
) => {
  const response = await axios.patch(
    `${API_URL}profile`,
    updateProfilePayload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data as UserProfile;
};
