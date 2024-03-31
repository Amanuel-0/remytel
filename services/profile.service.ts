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
