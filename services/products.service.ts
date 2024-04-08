import axios from "axios";
import { API_URL } from ".";
import {
  Product,
  BuyProductPayload,
  ConfirmProductPurchasePayload,
} from "@/models";

// products
export const getProducts = async (phoneNumber?: number) => {
  const response = await axios.get(
    `${API_URL}service/products?page=1&perPage=100&phoneNumber=${phoneNumber ?? "251963158999"}`,
  );
  return response.data as Product[];
};

// buy product
export const buyProduct = async (
  data: Partial<BuyProductPayload>,
  token: string,
) => {
  const response = await axios.post(`${API_URL}service/buy`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// confirm payment
export const confirmPayment = async (
  token: string,
  confirmPayload: ConfirmProductPurchasePayload,
) => {
  const response = await axios.post(
    `${API_URL}service/confirm`,
    confirmPayload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
