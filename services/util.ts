import axios from "axios";

export type IPInfoT = {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  timezone: string;
};
export const getUserIpInfo = async () => {
  const response = await axios.get(`https://ipinfo.io`);
  return response.data as IPInfoT;
};
