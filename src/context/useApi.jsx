import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config"; // ✅ updated import';
import AsyncStorage from "@react-native-async-storage/async-storage";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Get token from storage
  const getToken = async () => {
    return await AsyncStorage.getItem("token");
  };

  // 🔹 Common config with token
 const getConfig = async (customConfig = {}) => {
  const token = await getToken();

  return {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true", // ✅ added
      // "x-api-key": API_KEY,
      Authorization: token ? `Bearer ${token}` : "",
      ...(customConfig.headers || {}),
    },
    ...customConfig,
  };
};

  // 🔹 GET API
  const getRequest = async (endpoint, customConfig = {}) => {
    setLoading(true);
    setError(null);
    try {
      const config = await getConfig(customConfig);
    console.log("GET Request to:", endpoint,config);

      const response = await axios.get(`${API_URL}${endpoint}`, config);
      return response.data;
    } catch (err) {
        console.log("API Error:", err.response || err.message);
      setError(err.response?.data?.message || err.message);
      throw (err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 POST API
  const postRequest = async (endpoint, data, customConfig = {}) => {
    setLoading(true);
    setError(null);
    try {
      const config = await getConfig(customConfig);
      const response = await axios.post(
        `${API_URL}${endpoint}`,
        data,
        config
      );
      // console.log(response)
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw (err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getRequest,
    postRequest,
  };
};

export default useApi;