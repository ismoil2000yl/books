import axios from "axios";
import config from "config";
import { useState } from "react";
import storage from "services/storage";

const api = axios.create({
  baseURL: "http://devtest.lavina.tech/test",
  timeout: 7000,
  timeoutErrorMessage: "timeout"
});

const RefreshToken = localStorage.getItem("refresh-token")

// api.defaults.params = {};
// api.defaults.headers.common["Accept"] = "application/json";
// api.defaults.headers.common["Cache-Control"] = "no-cache";
api.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8";
// api.defaults.params["_f"] = "json";

api.interceptors.request.use(
  (configs) => {

    const token = storage.get("token") || "";
    if (token) {
      configs.headers.Authorization = `Bearer ${token}`;
    }
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error);

    // if (error.response.status) {
    // if (error.response.status === 401) {
    //   api.post('/refresh/', { refresh: RefreshToken }).then((data) => {
    //     localStorage.setItem("token", data.data.access)
    //     localStorage.setItem("refresh-token", data.data.refresh)
    //   })
    // }
    // if (error.response.status === 403) {
    //   api.post('/refresh/', { refresh: RefreshToken }).then((data) => {
    //     localStorage.setItem("token", data.data.access)
    //     localStorage.setItem("refresh-token", data.data.refresh)
    //   })
    // }
    // }
    return Promise.reject(error);
  }
);

export default api;