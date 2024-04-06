import axios from "axios";
import { API_URL } from ".";
import {
  GetRequestResponse,
  TopupRequestRequestPayload,
  TopupRequestResponse,
} from "@/models";

export const createTopupRequest = async (
  data: TopupRequestRequestPayload,
  token: string,
) => {
  const response = await axios.post(`${API_URL}service/request`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as TopupRequestResponse;
};

export const getRequest = async (id: string, token: string) => {
  const response = await axios.get(`${API_URL}service/request/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as Partial<GetRequestResponse>;
};
