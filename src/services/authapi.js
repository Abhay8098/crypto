import axios from "axios";

export const customApi = axios.create({
  baseURL: `https://bridgeapi.onrender.com`,
});

customApi.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("app-token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export const adminLogin = async (values) => {
  try {
    const { data } = await customApi.post(`/api/admin/login`, values);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response.data.message || error.message,
    };
  }
};

export const getCrypto = async (limit) => {
  try {
    const { data } = await customApi.get(`/tokens??per_page=${limit}`)
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response.data.message || error.message,
    };
  }
};

export const getCryptoDetails = async (values) => {
  try {
    const { data } = await customApi.post(`/quotes`,values);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response.data.message || error.message,
    };
  }
};