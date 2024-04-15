import axios from "axios";
import { API_URL } from ".";
import { CheckoutPayload } from "@/models";

export const processCheckout = async (data: CheckoutPayload, token: string) => {
  const response = await axios.post(`${API_URL}service/checkout`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
