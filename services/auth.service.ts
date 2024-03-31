import axios from "axios";
import { API_URL } from ".";

type LoginData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  code: string;
};

type VerifyOtpData = {
  otp: string;
  phoneNumber: string;
};

interface Session {
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

interface User {
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

// login
export const login = async (data: LoginData) => {
  const response = await axios.post(`${API_URL}auth/login`, data);
  return response.data as Partial<User>;
};

// verify otp
export const verifyOtp = async (data: VerifyOtpData) => {
  const response = await axios.post(`${API_URL}auth/verify`, data);
  return response.data;
};

// get profile
export const getProfile = async (token: string) => {
  const response = await axios.get(`${API_URL}profile/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as Partial<User>;
};
