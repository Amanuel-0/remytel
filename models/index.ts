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

//  request related models
export interface TopupRequestRequestPayload {
  senderPhoneNumber: string;
  code: string;
}
export interface TopupRequestResponse {
  url: string;
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
