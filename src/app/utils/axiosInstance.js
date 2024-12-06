import axios from "axios";
import { Toast } from "../shared/Toast";
export const baseURL = "http://localhost:8050/";

const ApiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});
export default ApiClient;

// Response Interceptor
ApiClient.interceptors.response.use(
  (response) => {
    if (response?.status === 403 || response?.status === 401) {
      typeof window !== "undefined" && localStorage.clear();
      signOut({ callbackUrl: "/" });
    } else {
      return response.data;
    }
  },
  (error) => {
    if (error.response) {
      // Handle specific status codes
      const { status, message } = error.response;

      if (status === 403) {
        console.warn("Unauthorized. Redirecting to login.");
        localStorage.removeItem("authToken");

        // Avoid redirect in non-browser environments
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      } else if (status === 404) {
        Toast({ message: error.message, type: "error" });
        return Promise.reject();
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received: ", error.request);
    } else {
      // Something else caused the error
    }

    // Reject the error to allow further handling in the calling code
    return Promise.reject(error);
  }
);
