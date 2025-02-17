import axios from "axios";
import jwt from "jsonwebtoken";
import { useMemo } from "react";
import { useSelector } from "react-redux";
export const formatISOStringToDMY = (dateString) => {
  const date = new Date(dateString); // Parse the ISO string
  if (isNaN(date)) {
    console.log("Invalid date string");
  }
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const updated = month.slice(0, 3);
  const year = date.getFullYear();

  const formattedDate = `${day} ${updated} ${year}`;
  return formattedDate;
};

export const formatISOStringToDate = (dateString) => {
  const date = new Date(dateString); // Parse the ISO string
  if (isNaN(date)) {
    console.log("Invalid date string");
  }
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  // const updated = month.slice(0, 3)
  // const year = date.getFullYear();

  // const formattedDate = `${day} ${updated} ${year}`;
  return day;
};

export const formatISOStringToMonth = (dateString) => {
  const date = new Date(dateString); // Parse the ISO string
  if (isNaN(date)) {
    console.log("Invalid date string");
  }
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  // const updated = month.slice(0, 3)
  // const year = date.getFullYear();

  // const formattedDate = `${day} ${updated} ${year}`;
  return month;
};

export const formatISOStringToDayMonth = (dateString) => {
  const date = new Date(dateString); // Parse the ISO string
  if (isNaN(date)) {
    console.log("Invalid date string");
  }
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const updated = month.slice(0, 3);
  // const year = date.getFullYear();

  const formattedDate = `${day} ${updated}`;
  return formattedDate;
};

export function formatDate(dateString) {
  const [day, month, year] = dateString.split("/");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = months[parseInt(month, 10) - 1];
  return `${monthName} ${parseInt(day, 10)}, ${year}`;
}

export const checkToken = async (token) => {
  try {
    const decodedToken = jwt.decode(token, { complete: true });
    if (decodedToken && decodedToken.header && decodedToken.payload) {
      const issuedAt = decodedToken.payload.iat;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const isValidIat = issuedAt <= currentTimestamp;
      const expiration = decodedToken.payload.exp;
      const isValidExp = currentTimestamp <= expiration;
      if (isValidIat && isValidExp) {
        return { isValid: true, payload: decodedToken.payload };
      } else {
        return { isValid: false, payload: "" };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getData = () => {
  const data = useSelector((state) => state.userData.data);
  const memoizedData = useMemo(() => {
    const {
      id = null,
      fullname = null,
      username = null,
      dp = null,
      sessionId = null,
      memberships = null,
    } = data || {};
    return { id, fullname, username, dp, sessionId, memberships };
  }, [data]);

  return memoizedData;
};

export const getLoading = () => {
  const isLoading = useSelector((state) => state.userData.isLoading);
  return isLoading;
};

export const formatNumber = (number) => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + "B";
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  } else {
    return number.toString();
  }
};

export const reportErrorToServer = async (error, userId) => {
  try {
    console.log(error, userId);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/error/createError`,
      {
        error,
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const errorMaker = async (error, path, method) => {
  try {
    const data = {
      name: method,
      message: error?.message || "Unknown error",
      code: error.response?.status || "No status",
      path: `${process.env.NEXT_PUBLIC_API}${path}`,
      syscall: error?.name || "Unknown syscall",
      stack: error?.stack || "No stack trace",
      userId: null,
      timestamp: new Date().toISOString(),
      platform: "workspace",
    };
    await reportErrorToServer(data);
  } catch (error) {
    console.log(error);
  }
};

// .catch(async function (error) {
//   const data = {
//     name: "POST",
//     message: error?.message || "Unknown error",
//     code: error.response?.status || "No status",
//     path: `${API}/login/webapplogin`,
//     syscall: error?.name || "Unknown syscall",
//     stack: error?.stack || "No stack trace",
//     userId: null,
//     timestamp: new Date().toISOString(),
//     platform: "web-app",
//   };
//   await reportErrorToServer(data);
//   toast.error("Something went wrong...");
// });
