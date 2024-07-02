import { Contact, IListResponse, IPageResponse, Transaction } from "@/models";
import axios from "axios";
import { API_URL } from "./base";

export const getContacts = async (
  token: string,
): Promise<IListResponse<Contact>> => {
  const response = await axios.get(`${API_URL}contacts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as IListResponse<Contact>;
};

export const createContact = async (
  { name, phoneNumber }: { name: string; phoneNumber: string },
  token: string,
): Promise<Contact> => {
  const response = await axios.post(
    `${API_URL}contacts`,
    { name, phoneNumber },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data as Contact;
};
