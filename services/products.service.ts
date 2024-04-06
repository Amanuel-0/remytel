import axios from "axios";
import { API_URL } from ".";
import { Product, BuyProductPayload } from "@/models";

// export interface IPage {
//   page: number;
//   perPage: number;
// }
// export const defaultPaging: IPage = {
//   page: 1,
//   perPage: 10,
// };

// products
export const getProducts = async (phoneNumber?: number) => {
  const response = await axios.get(
    `${API_URL}service/products?page=1&perPage=100&phoneNumber=${phoneNumber ?? "251963158999"}`,
  );
  return response.data as Product[];
};

// buy product

export const buyProduct = async (data: BuyProductPayload) => {
  const response = await axios.post(`${API_URL}service/buy`, data);
  return response.data;
};
