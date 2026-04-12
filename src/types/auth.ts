import type { UserResource } from "./user";

export type RefreshTokenBody = { device_token: string };
export type RefreshTokenResponse = { device_token: boolean };

export type { UserResource };

export type GoogleLoginBody = {
  client_id: string;
  email: string;
  name: string;
  type: "google" | "apple";
  device_token: string;
};

export type GoogleLoginResponse = {
  status: "success";
  token: string;
  user: User;
  is_phone_exists: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
  [key: string]: unknown;
};

export interface AuthWithPhoneAndNameRequest {
  phone: string;
  name: string;
}

export interface AuthWithPhoneRequest {
  phone: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
  device_token: string;
}
