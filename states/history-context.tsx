"use client";
import { IPageMetadata, IPageResponse, Transaction } from "@/models";
import {
  getOrderHistory,
  getSubscriptionHistory,
} from "@/services/profile.service";
import {
  OrderHistoryResT,
  OrderT,
  SubscriptionHistoryResT,
  SubscriptionT,
} from "@/services/type";
import { LocalStorageUtil } from "@/utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import userContext from "./user-context";

export interface HistoryContextI {
  subscriptionHistory: IPageResponse<SubscriptionT>;
  orderHistory: IPageResponse<Transaction>;
  refetch: () => void;
  loading: boolean;
  orderError?: string | null;
  subscriptionError?: string | null;
}
const defaultPageMetaData: IPageMetadata = {
  hasNext: false,
  hasPrev: false,
  page: 0,
  size: 10,
  total: 0,
};
const historyContext = createContext<HistoryContextI>({
  subscriptionHistory: { items: [], metadata: defaultPageMetaData },
  orderHistory: { items: [], metadata: defaultPageMetaData },
  refetch: () => {},
  loading: true,
  orderError: null,
  subscriptionError: null,
});

// create a provider that can change the value of the context
export const HistoryContextProvider = (props: any) => {
  const {
    user: { token },
  } = useContext(userContext);
  const [subscriptions, setSubscriptions] = useState<
    IPageResponse<SubscriptionT>
  >({ items: [], metadata: defaultPageMetaData });
  const [orders, setOrders] = useState<IPageResponse<Transaction>>({
    items: [],
    metadata: defaultPageMetaData,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [orderError, setOrderError] = useState<string | undefined | null>(null);
  const [subscriptionError, setSubscriptionError] = useState<
    string | undefined | null
  >(null);
  const fetchHistoy = useCallback(() => {
    if (token) {
      setLoading(true);
      getOrderHistory({ page: 0, size: 10 }, token)
        .then((d) => {
          setOrders(d);
        })
        .catch((err) => {
          setOrderError(err.message);
        });
      getSubscriptionHistory({ page: 0, size: 10 }, token)
        .then((d) => {
          setSubscriptions(d);
        })
        .catch((err) => {
          setSubscriptionError(err.message);
        });
      setLoading(false);
    }
  }, [token]);
  useEffect(() => {
    fetchHistoy();
  }, [fetchHistoy]);

  const refetch = () => {
    fetchHistoy();
  };

  const contextValue: HistoryContextI = {
    orderHistory: orders,
    subscriptionHistory: subscriptions,
    loading,
    refetch,
    orderError,
    subscriptionError,
  };

  return (
    <historyContext.Provider value={contextValue}>
      {props.children}
    </historyContext.Provider>
  );
};

export default historyContext;
