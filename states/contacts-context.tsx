"use client";
import { Contact, IListResponse } from "@/models";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import userContext from "./user-context";
import { getContacts } from "@/services/contact.service";

export interface ContactsContextI {
  contacts: IListResponse<Contact> | null;
  refetch: () => void;
  loading: boolean;
  error?: string | null;
}

const contactsContext = createContext<ContactsContextI>({
  contacts: null,
  refetch: () => {},
  loading: true,
  error: null,
});

// create a provider that can change the value of the context
export const ContactsContextProvider = (props: any) => {
  const {
    user: { token },
  } = useContext(userContext);
  const [contacts, setContacts] = useState<IListResponse<Contact> | null>({
    items: [],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContact = useCallback(() => {
    if (token) {
      setLoading(true);
      getContacts(token)
        .then((d) => {
          setError(null);
          setContacts(d);
        })
        .catch((err) => {
          setError(
            err?.response?.data?.message ||
              "Unknown error while trying to fetch contacts",
          );
          setContacts(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);
  useEffect(() => {
    fetchContact();
  }, [fetchContact]);

  const contextValue: ContactsContextI = {
    contacts,
    loading,
    refetch: fetchContact,
    error,
  };

  return (
    <contactsContext.Provider value={contextValue}>
      {props.children}
    </contactsContext.Provider>
  );
};

export default contactsContext;
