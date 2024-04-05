import axios from "axios";
import { API_URL } from ".";

// export interface IPage {
//   page: number;
//   perPage: number;
// }
// export const defaultPaging: IPage = {
//   page: 1,
//   perPage: 10,
// };

export interface Price {
  amount: number;
  currency: string;
  fee: number;
  total: number;
}

export interface Product {
  amount: number;
  unit: string;
  description: string;
  id: number;
  name: string;
  operator: number;
  operator_name: string;
  price: Price;
  type: "Airtime" | "Bundle" | "Data";
}

// products
export const getProducts = async (phoneNumber?: number) => {
  const response = await axios.get(
    `${API_URL}service/products?page=1&perPage=100&phoneNumber=${phoneNumber ?? "251963158999"}`,
  );
  return response.data;
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
