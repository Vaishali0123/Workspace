"use client";
import React, { useEffect, useState } from "react";
import w1 from "../assets/image/w1.png";
import w2 from "../assets/image/w2.png";
import w3 from "../assets/image/w3.png";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { API, errorHandler } from "../utils/helpers";
import axios from "axios";
import toast from "react-hot-toast";
import {
  emailAuth,
  initOTPless,
  phoneAuth,
  verifyEmailOTP,
  verifyOTP,
} from "../utils/otpUtils";
import { useAuthContext, UserData } from "./Components/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import EmailInput from "./Components/EmailInput";
import EmailOtpComponent from "./Components/EmailOtpComponent";
import MobileInput from "./Components/MobileInput";
import OtpComponent from "./Components/OtpComponent";
import Logo from "../assets/Logo";

interface Slide {
  img: StaticImageData;
  msg: string;
}
const Page = () => {
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [change, setChange] = React.useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const { setAuth, setData } = useAuthContext();
  const [activeSlide, setActiveSlide] = useState<number>(0);

  // for navigation
  const router = useRouter();

  // for phone number
  const sendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidPhoneNumber = /^\d{10}$/.test(phoneNumber);

    if (!isValidPhoneNumber) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    try {
      setLoading(true);
      await phoneAuth(phoneNumber);
      setLoading(false);
      setShowOtp(true);
      toast.success("Otp Sent Successfully!");
    } catch (error) {
      console.log(error);
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const cookieSetter = (data: UserData, token: string) => {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 15);

      Cookies.set("token", token, { expires: expirationDate });

      setData(data);
      setAuth(true);

      // toast.success("Login successful!");
      // changeRole();
      router.push("/main/Overview");
    } catch (error) {
      errorHandler(error);
    }
  };

  // const changeRole = async () => {
  //   await axios.post(`${API}/changeRole`, {
  //     role: "Creator",
  //   });
  // };

  const loginWithPhoneNumber = async () => {
    try {
      setLoading(true); // Set loading to true when the request starts

      // Make the axios POST request to login with phone number
      const response = await axios.post(`${API}/loginwithnumber`, {
        phone: "91" + phoneNumber,
        platform: "Workspace",
      });

      // Check if the response is successful
      if (response.data.success) {
        cookieSetter(response.data.data, response.data.access_token);
      } else {
        toast.error("Seems like you don't have an account.");
        window.open("https://grovyo.com/auth/signup", "_blank");
      }
      // else {
      //   // Handle case when login fails, like user not found
      //   toast.error("Seems like you don't have an account in the app.");
      // }
    } catch (error) {
      errorHandler(error);

      window.open("https://grovyo.com/auth/signup", "_blank");
      setLoading(false);
    }
  };

  useEffect(() => {
    initOTPless(() => {
      console.log("otpless initiated!");
    });
  }, []);

  const verificationOfPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }
    try {
      setLoading(true);
      const verified = await verifyOTP(phoneNumber, otp);
      if (verified) {
        toast.success("OTP Verified Successfully");
        await loginWithPhoneNumber();
      } else {
        toast.error("OTP Verification Failed");
      }
    } catch (error) {
      errorHandler(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // for email

  const sendEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      await emailAuth(email);
      setLoading(false);
      setShowOtp(true);
      toast.success("Otp Sent Successfully!");
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API}/loginWithEmail`, {
        email: email,
      });
      if (response.data.success) {
        cookieSetter(response.data.data, response.data.access_token);
      } else {
        toast.error("Seems like you don't have an account.");
        window.open("https://grovyo.com/auth/signup", "_blank");
      }
    } catch (error) {
      errorHandler(error);
      window.open("https://grovyo.com/auth/signup", "_blank");
      setLoading(false);
    }
  };

  useEffect(() => {
    initOTPless(() => {
      console.log("otpless initiated!");
    });
  }, []);

  const verificationOfEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }
    try {
      setLoading(true);
      const verified = await verifyEmailOTP(email, otp);
      if (verified) {
        toast.success("OTP Verified Successfully");
        await loginWithEmail();
      } else {
        toast.error("OTP Verification Failed");
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const slides: Slide[] = [
    { img: w1, msg: `Your Hub for Building, Engaging, and Earning` },
    { img: w2, msg: `Free Store Creation: Sell Anything on Grovyo` },
    { img: w3, msg: `Content Creation, Community Management, Growth Insights` },
  ];
  const nextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="h-screen w-screen bg-loginbg bg-cover bg-center bg-[#fefefe] flex pn:max-sm:flex-col">
      {/* left  */}
      <div className="w-[50%] h-full flex py-20 justify-end items-center pn:max-sm:hidden">
        <div className="overflow-hidden w-[98%] bg-loginbg bg-cover bg-center rounded-xl bg-[#A5BEFE] h-[95vh] pt-36">
          <div
            className="relative flex transition-transform duration-500 transform"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="h-[50vh] w-full flex-col flex-shrink-0 bg-lightgray flex items-center justify-center text-black text-2xl"
              >
                <div className="mb-10 font-semibold text-3xl max-w-[80%] leading-snug text-center text-[#0066FF]">
                  {slide.msg}
                </div>
                <div className="flex justify-center items-center">
                  <Image
                    priority
                    src={slide.img}
                    alt="hlo"
                    className={`max-w-[600px] ${
                      index === 0 ? "relative -left-12" : ""
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-[130px]">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 duration-500 rounded-full mx-2 ${
                  index === activeSlide ? "bg-blue-500" : "bg-white"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      {/* right  */}
      <div className="w-[45%] flex relative justify-center h-full items-center pn:max-sm:w-full">
        {/* {children} */}
        <div className=" inset-0 w-full z-50 h-screen flex justify-center items-center ">
          <div className="w-[50%] sm:max-md:w-[70%] pn:max-sm:w-[80%] h-[85%] justify-center pn:max-sm:items-center flex flex-col p-2 space-y-3 items-start">
            {/* Logo  */}
            <div className="w-[70px] sm:hidden h-[70px] border-dotted  flex items-center justify-center rounded-3xl">
              <Logo />
            </div>
            <div className="text-[40px] font-extrabold text-[#2c2c2c]">
              Login
            </div>
            {/* text  */}

            {!showOtp && (
              <div className="flex pn:max-sm:text-center">
                <span className=" text-[16px] font-medium text-[#9095A0] bg-transparent ">
                  &quot;Don’t have an account?{" "}
                  <span className="text-blue-500">
                    <Link
                      href="https://grovyo.com/auth/signup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      Sign up here
                    </Link>
                  </span>
                  &quot;
                </span>
              </div>
            )}

            {/* Switcher */}
            {!showOtp && (
              <div className="grid grid-cols-1  border-2 border-slate-50 relative rounded-xl bg-slate-50 pn:max-sm:-mt-6 w-fit">
                <div className="flex rounded-xl text-[#303030] select-none text-[14px]">
                  <div
                    onClick={() => {
                      if (showOtp) {
                        return;
                      }
                      setChange(1);
                    }}
                    className={`  rounded-xl flex justify-center items-center h-[35px] w-[150px] z-10 ${
                      change === 1 ? "font-bold " : "cursor-pointer"
                    }`}
                  >
                    Phone no.
                  </div>
                  <div
                    className={`absolute duration-100 h-[35px] w-[50%] rounded-xl bg-slate-100 ${
                      change === 1 ? "left-[0px] " : " left-[50%]"
                    }`}
                  ></div>
                  <div
                    onClick={() => {
                      if (showOtp) {
                        return;
                      }
                      setChange(2);
                    }}
                    className={` rounded-xl flex justify-center  items-center h-[35px] w-[150px] z-10 ${
                      change === 2 ? "font-bold " : "cursor-pointer"
                    }`}
                  >
                    Email
                  </div>
                </div>
              </div>
            )}

            {/* phone */}
            <div
              className={`${
                change === 1
                  ? "flex justify-start flex-col w-full items-start pt-2"
                  : "hidden"
              } `}
            >
              {showOtp ? (
                <OtpComponent
                  otp={otp}
                  setOtp={setOtp}
                  verificationOfPhone={verificationOfPhone}
                  loading={loading}
                  setShowOtp={setShowOtp}
                  phoneNumber={phoneNumber}
                />
              ) : (
                <MobileInput
                  // sendPhoneOtp={loginWithPhoneNumber}
                  number={phoneNumber}
                  sendPhoneOtp={sendPhoneOtp}
                  loading={loading}
                  setPhoneNumber={setPhoneNumber}
                />
              )}
            </div>
            {/* email */}
            <div
              className={`${
                change === 2
                  ? "flex justify-start w-full flex-col items-start pt-2"
                  : "hidden"
              } `}
            >
              {showOtp ? (
                <EmailOtpComponent
                  email={email}
                  setShowOtp={setShowOtp}
                  otp={otp}
                  setOtp={setOtp}
                  loading={loading}
                  verifyEmailOTP={verificationOfEmail}
                />
              ) : (
                <EmailInput
                  email={email}
                  setEmail={setEmail}
                  loading={loading}
                  sendEmailOtp={sendEmailOtp}
                  // sendEmailOtp={loginWithEmail}
                />
              )}
            </div>
            {/* Conditions */}
            <div className="flex bottom-3 absolute  w-[50%] pn:max-sm:w-full flex-wrap justify-center items-center  dark:text-white text-[#414141] gap-4 text-[12px]  pn:max-sm:-mb-3">
              <Link href={"../../terms"}>T&C</Link>
              <Link href={"../privacy"}>Privacy</Link>
              <Link href={"../contact"}>Contact Us</Link>
              {/* <Link href={"../about"}>About</Link> */}
              <Link href={"../refund"}>Refund</Link>
              <Link href={"/requestdata"}>Request Data</Link>
              <Link href={"/deleterequest"}>Delete Request</Link>
              {/* <Link href={"../shipping"}>Shipping</Link> */}
              <Link href={"../cancellation"}>Cancellation</Link>
              <Link href={"../return"}>Return Policy</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex absolute z-10 bottom-3 pn:max-sm:hidden w-[100%] bg-slate-500 flex-wrap justify-end items-center dark:text-white text-[#414141] gap-4 text-[12px]  "></div>
    </div>
  );
};

export default Page;
