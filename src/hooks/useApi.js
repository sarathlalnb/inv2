import { useState } from "react";
import axiosInstances from "../services/axiosInstances";

const useApi = (type) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const authToken = sessionStorage.getItem("token");

  const request = async (...args) => {
    setLoading(true);
    const [url, payload, header] = args;
    let response;
    const api = authToken ? axiosInstances.authInstance() : axiosInstances.baseInstance();
    const mApi = axiosInstances.MauthInstance();
    
    try {
      if (type === "post") {
        response = await api.post(url, payload, header);
      } else if (type === "patch") {
        response = await api.patch(url, payload, header);
      } else if (type === "post") {
        response = await api.post(url, payload, header);
      } else if (type === "mPost") {
        response = await mApi.post(url, payload, header);
      } else if (type === "mPut") {
        response = await mApi.put(url, payload, header);
      } else if (type === "put") {
        response = await api.put(url, payload, header);
      } else if (type === "delete") {
        response = await api.delete(url);
      }else if(type==="hget"){
        response =await api.get(url,header)
      }
       else {
        response = await api.get(url);
      }
      setError(!response.ok);
      setData(response.data);
      return { response, error: null };
    } catch (err) {
      setError(true);
      setData(null);
      return { response, error: err };
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, request };
};

export default useApi;
