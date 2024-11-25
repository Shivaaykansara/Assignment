import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import sideimage from "../assets/images/signinup.jpg";
import icon from "../assets/images/icon.png";
import { LuCalendar } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const { sendOtp, verifyOtp, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  // Check if all required fields are filled to enable button
  useEffect(() => {
    const isValid = name.trim() !== "" && dob.trim() !== "" && email.trim() !== "";
    setIsFormValid(isValid);
  }, [name, dob, email]);

  const handleButtonClick = async () => {
    if (!otpSent) {
      // Send OTP functionality
      try {
        await sendOtp(email, "signup", name, dob);
        setOtpSent(true);
        toast.success("OTP sent successfully!");
      } catch (err) {
        console.error("Error sending OTP:", err);

        // Safely extract error message
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to send OTP. Please try again.";

        toast.error(errorMessage);
      }
    } else {
      // Verify OTP functionality
      try {
        await verifyOtp(email, otp);
        navigate("/"); // Redirect to home page after OTP verification
        toast.success("Signup successful!");
      } catch (err) {
        console.error("OTP verification failed:", err);

        // Safely extract error message
        const errorMessage =
          err instanceof Error
            ? err.message
            : "OTP verification failed. Please try again.";

        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="h-screen md:flex overflow-y-hidden">
      {/* Left Form */}
      <div className="lg:px-8 px-6 md:w-1/2 justify-center lg:py-6 py-4 items-center bg-white">
        <div className="flex items-center justify-center md:justify-start md:align-middle gap-3">
          <img src={icon} alt="" height="32px" width="32px" />
          <p className="md:text-2xl text-xl">HD</p>
        </div>
        <div className="lg:py-8 lg:px-16 md:p-8 text-center md:text-left ">
          <div className="leading-3 mt-8">
            <h2 className="lg:text-2xl text-xl font-bold">Sign up</h2>
            <p className="lg:text-lg text-md text-[#969696]">
              Sign up to enjoy the feature of HD
            </p>
          </div>
          <div className="my-8 flex flex-col gap-5">
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                className="peer transition-all lg:p-2 p-1 w-full lg:text-lg md:text-base text-gray-600 rounded-md border focus:ring-2 focus:[#367aff] outline-none select-all"
                disabled={otpSent} // Disable if OTP is sent
              />
              <label className="z-2 text-gray-500 pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all text-sm peer-focus:text-sm peer-placeholder-shown:text-sm lg:peer-placeholder-shown:text-lg px-1 peer-focus:px-1 peer-placeholder-shown:px-0 bg-white peer-focus:text-[#367aff] peer-focus:bg-white peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
                Your Name
              </label>
            </div>
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                {/* Calendar Icon */}
                <LuCalendar className="text-gray-500 w-5 h-5 mr-2" />

                {/* React DatePicker */}
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setDob(date ? date.toISOString().split("T")[0] : "");
                  }}
                  dateFormat="dd MMMM yyyy"
                  placeholderText=""
                  className="w-full text-black lg:p-1 placeholder-gray-500 focus:outline-none"
                />
              </div>

              <label className="z-2 text-gray-500 pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all text-sm peer-focus:text-sm peer-placeholder-shown:text-sm lg:peer-placeholder-shown:text-lg px-1 peer-focus:px-1 peer-placeholder-shown:px-0 bg-white peer-focus:text-[#367aff] peer-focus:bg-white peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
                Date of Birth
              </label>
            </div>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                className="peer transition-all lg:p-2 p-1 w-full lg:text-lg md:text-base text-gray-600 rounded-md border focus:ring-2 focus:[#367aff] outline-none select-all"
                disabled={otpSent} // Disable if OTP is sent
              />
              <label className="z-2 text-gray-500 pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all text-sm peer-focus:text-sm peer-placeholder-shown:text-sm lg:peer-placeholder-shown:text-lg px-1 peer-focus:px-1 peer-placeholder-shown:px-0 bg-white peer-focus:text-[#367aff] peer-focus:bg-white peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
                Email
              </label>
            </div>

            {/* OTP Field */}
            <div className="relative">
              <input
                type="password"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder=""
                className="peer transition-all lg:p-2 p-1 w-full lg:text-lg md:text-base text-gray-600 rounded-md border focus:ring-2 focus:[#367aff] outline-none select-all"
                disabled={!otpSent} // Disable until OTP is sent
              />
              <label className="z-2 text-gray-500 pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all text-sm peer-focus:text-sm peer-placeholder-shown:text-sm lg:peer-placeholder-shown:text-lg px-1 peer-focus:px-1 peer-placeholder-shown:px-0 bg-white peer-focus:text-[#367aff] peer-focus:bg-white peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
                OTP
              </label>
            </div>

            {/* Dynamic Button */}
            <button
              onClick={handleButtonClick}
              disabled={loading || (!isFormValid && !otpSent)} // Disable if invalid form or loading
              className={`${
                otpSent ? "bg-green-500" : "bg-blue-500"
              } text-white lg:p-2 p-1 w-full lg:text-lg text-sm rounded-md`}
            >
              {loading
                ? otpSent
                  ? "Verifying..."
                  : "Sending..."
                : otpSent
                ? "Sign Up"
                : "Send OTP"}
            </button>

            <div className="flex items-center ">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button className="w-full flex items-center justify-center lg:p-2 p-1 border border-gray-300 rounded-md shadow-sm lg:text-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Continue with Google
              <FcGoogle className="mx-2 h-5 w-5" />
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign In
              </Link>
            </p>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>

      {/* Right Image (visible on large screens) */}
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

export default Signup;
