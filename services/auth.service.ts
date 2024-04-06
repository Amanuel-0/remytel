import {
  LoginPayload,
  User,
  OtpVerificationPayload,
  UserProfile,
  UpdateProfilePayload,
} from "@/models";
import axios from "axios";
import { API_URL } from ".";

// login
export const login = async (data: Partial<LoginPayload>) => {
  const response = await axios.post(`${API_URL}auth/login`, data);
  return response.data as Partial<User>;
};

// verify otp
export const verifyOtp = async (data: OtpVerificationPayload) => {
  const response = await axios.post(`${API_URL}auth/verify`, data);
  return response.data as Partial<User>;
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

// update profile
export const updateProfile = async (
  data: Partial<UpdateProfilePayload>,
  token: string,
) => {
  // export const updateProfile = async (data: Partial<User>, token: string) => {
  const response = await axios.patch(`${API_URL}profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as Partial<UserProfile>;
};

// logout
export const logout = async () => {
  // remove token from local storage
  localStorage.removeItem("user");
};
