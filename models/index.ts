import { SubscriptionT } from "@/services/type";

export * from "./page-options";

// auth related models
export interface LoginPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  code: string;
}

export interface OtpVerificationPayload {
  otp: string;
  phoneNumber: string;
  code: string;
}

export interface Session {
  id: string;
  token: string;
  deviceAgent: string;
  deviceIp: string;
  installationId: string;
  ipLocation: string;
  lastSeen: string;
  socketId: null | string;
  active: boolean;
  terminated: boolean;
  fcmToken: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  profileId: string;
}

export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
  email: string;
  promoOptIn: boolean;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  pendingOTP: string;
  lastCharedAt: string;
  verifiedPhoneNumber: boolean;
  verifiedProfile: boolean;
  profilePicture: null | string;
  password: string;
  role: string;
  blocked: boolean;
  deleted: boolean;
  loginAttempts: number;
  loginsToday: number;
  lastLoginAt: string;
  theme: string;
  language: string;
  notificationsEnabled: boolean;
  stripeCustomerId: string;
  paymentMethodId: string;
  createdAt: string;
  updatedAt: string;
  Session: Session[];
}

export interface User {
  user: UserProfile;
  token: string;
}

// products related models
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

export interface BuyProductPayload {
  senderFirstName: string;
  senderLastName: string;
  senderPhoneNumber: string;
  senderEmail: string;
  optinForMarketing: boolean;
  productId: number;
}

export interface ConfirmProductPurchasePayload {
  transaction_id: string;
  status: "SUCCESS" | "FAILED";
}

//  request related models
export interface TopupRequestRequestPayload {
  senderPhoneNumber: string;
  code: string;
}
export interface TopupRequestResponse {
  url: string;
  id: string;
}
export interface GetRequestResponse {
  id: string;
  profileId: string;
  hId: string;
  url: string;
  senderProfileId: string;
  senderPhoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  senderProfile: UserProfile;
  profile: UserProfile;
}

// profile: transaction history, order history, subscription history
export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
  email: string;
  promoOptIn: boolean;
}

export interface Transaction {
  id: string;
  hId: any;
  profileId: string;
  planId: string;
  amount: number;
  currency: string;
  status: string;
  receiver: string;
  receiverName: any;
  transactionId: string;
  externalId: string;
  subscriptionId: any;
  paymentIntent: string;
  checkoutSessionId: any;
  receiptUrl: string;
  chargeId: string;
  refundId: any;
  week: number;
  month: number;
  createdAt: string;
  updatedAt: string;
  subscription?: SubscriptionT;
  product: Product;
}

export interface CheckoutPayload {
  receiverPhoneNumber: string;
  receiverName: string;
  subscription: string | undefined;
  productId: number;
  successRoute: string;
  failureRoute: string;
}

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  profileId: string;
}
