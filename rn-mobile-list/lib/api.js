import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "http://192.168.1.45:5000/api";

export const register = (username, password) =>
  axios.post(`${API}/users/register`, { username, password });

export const login = async (username, password) => {
  const res = await axios.post(`${API}/users/login`, { username, password });
  await AsyncStorage.setItem("token", res.data.token);
};

export const getProtectedData = async () => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.get(`${API}/protected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
