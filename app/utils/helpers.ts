import axios from "axios";
import toast from "react-hot-toast";

export const API = process.env.NEXT_PUBLIC_API;
export const ASSET_URL = process.env.NEXT_PUBLIC_ASSETURL;

// export const errorHandler = (error: unknown) => {
//   // console.log(error);
//   if (axios.isAxiosError(error)) {
//     if (error?.response) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } else if (error.request) {
//       toast.error("Network error. Please try again later.");
//     } else {
//       toast.error("An error occurred. Please try again.");
//     }
//   } else {
//     toast.error("Unexpected error occurred.");
//   }
// };
export const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Extract message from API response
      const message =
        error.response.data?.message ||
        error.response.data?.error || // Some APIs return 'error' instead of 'message'
        "Something went wrong";
      toast.error(message);
    } else if (error.request) {
      // Network error
      toast.error("Network error. Please check your connection and try again.");
    } else {
      // Unknown axios error
      toast.error("An unexpected error occurred. Please try again.");
    }
  } else if (error instanceof Error) {
    // Handle non-Axios errors
    toast.error(error.message || "An unknown error occurred.");
  } else {
    // Catch-all for any other errors
    toast.error("Unexpected error occurred.");
  }
};
