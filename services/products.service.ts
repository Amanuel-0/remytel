import axios from "axios";
import { API_URL } from ".";

interface Price {
  amount: number;
  currency: string;
  fee: number;
  total: number;
}

interface Product {
  amount: number;
  unit: string;
  description: string;
  id: number;
  name: string;
  operator: number;
  operator_name: string;
  price: Price;
  type: string;
}

// products
export const getProducts = async () => {
  const response = await axios.get(
    `${API_URL}service/products?page=1&perPage=100&phoneNumber=251963158999`,
  );
  return response.data as Partial<Product[]>;
};

// buy product
type SenderInfo = {
  senderFirstName: string;
  senderLastName: string;
  senderPhoneNumber: string;
  senderEmail: string;
  optinForMarketing: boolean;
  productId: number;
};
export const buyProduct = async (data: SenderInfo) => {
  const response = await axios.post(`${API_URL}service/buy`, data);
  return response.data;
};
