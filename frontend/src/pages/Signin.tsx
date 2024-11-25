import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sideimage from "../assets/images/signinup.jpg";
import icon from "../assets/images/icon.png";

const SignIn: React.FC = () => {
  const { sendOtp, verifyOtp, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isValid = email.trim() !== "";
    setIsFormValid(isValid);
  }, [email]);

  const handleButtonClick = async () => {
    if (!otpSent) {
      try {
        await sendOtp(email, "login");
        setOtpSent(true);
        toast.success("OTP sent successfully!");
      } catch (err) {
        console.error("Error sending OTP:", err);
        toast.error((err as any).message || "Failed to send OTP. Please try again.");
      }
    } else {
      try {
        await verifyOtp(email, otp);
        navigate("/"); // Redirect to home page after OTP verification
        toast.success("Login successful!");
      } catch (err) {
        console.error("OTP verification failed:", err);
        toast.error((err as any).message || "An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="h-screen md:flex overflow-y-hidden">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="lg:px-8 px-6 md:w-1/2 justify-center lg:py-6 py-4 items-center bg-white">
        <Link to={"/"}>
          <div className="flex items-center justify-center md:justify-start md:align-middle gap-3">
            <img src={icon} alt="" height="32px" width="32px" />
            <p className="md:text-2xl text-xl">HD</p>
          </div>
        </Link>
        <div className="lg:py-8 lg:px-16 md:p-8 text-center md:text-left">
          <div className="leading-5 mt-8">
            <h2 className="lg:text-2xl text-xl font-bold">Sign in</h2>
            <p className="lg:text-lg text-md text-[#969696]">
              Please login to continue to your account
            </p>
          </div>
          <div className="my-8 flex flex-col gap-5">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                className="peer transition-all lg:p-2 p-1 w-full lg:text-lg md:text-base text-gray-600 rounded-md border focus:ring-2 focus:[#367aff] outline-none select-all"
                disabled={otpSent}
              />
              <label className="z-2 text-gray-500 pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all text-sm peer-focus:text-sm peer-placeholder-shown:text-sm lg:peer-placeholder-shown:text-lg px-1 peer-focus:px-1 peer-placeholder-shown:px-0 bg-white peer-focus:text-[#367aff] peer-focus:bg-white peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
                Email
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder=""
                className="peer transition-all lg:p-2 p-1 w-full lg:text-lg md:text-base text-gray-600 rounded-md border focus:ring-2 focus:[#367aff] outline-none select-all"
                disabled={!otpSent}
              />
              <label className="z-2 text-gray-500 pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all text-sm peer-focus:text-sm peer-placeholder-shown:text-sm lg:peer-placeholder-shown:text-lg px-1 peer-focus:px-1 peer-placeholder-shown:px-0 bg-white peer-focus:text-[#367aff] peer-focus:bg-white peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
                OTP
              </label>
            </div>

            <button
              onClick={handleButtonClick}
              disabled={loading || (!isFormValid && !otpSent)}
              className={`${
                otpSent ? "bg-green-500" : "bg-blue-500"
              } text-white lg:p-2 p-1 w-full lg:text-lg text-sm rounded-md`}
            >
              {loading
                ? otpSent
                  ? "Verifying..."
                  : "Sending..."
                : otpSent
                ? "Sign In"
                : "Send OTP"}
            </button>
            <div className="flex items-center ">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button className="w-full flex items-center justify-center lg:p-2 p-1 border border-gray-300 rounded-md shadow-sm lg:text-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Sign in with Google
              <FcGoogle  className="mx-2 h-5 w-5"/>
            </button>

            <p className=" text-center text-sm text-gray-600">
              Need an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Create One
              </Link>
            </p>
            
          </div>
          
        </div>
      </div>

      <div className="relative overflow-hidden md:flex w-1/2 hidden p-3">
        <img
          src={sideimage}
          alt="Signup Illustration"
          className="object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default SignIn;
