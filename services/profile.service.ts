import axios from "axios";
import { API_URL } from ".";

//get order history
export const getOrderHistory = async (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.get(`${API_URL}profile/history`);
  return response.data;
};

// subscription history
export const getSubscriptionHistory = async (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.get(`${API_URL}profile/subscriptions`);
  return response.data;
};

// cancel subscription
export const cancelSubscription = async (
  token: string,
  subscriptionId: string,
) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.delete(
    `${API_URL}profile/subscription/${subscriptionId}`,
  );
  return response.data;
};

// edit profile
export const editProfile = async (
  token: string,
  data: {
    firstName: string;
    lastName: string;
    email: string;
    promoOptIn: boolean;
  },
) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.patch(`${API_URL}profile`, data);
  return response.data;
};
