// AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import axios from "./authApi";
import { AuthContextType, User } from "./type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchUserData(savedToken);
    }
  }, []);

  const sendOtp = async (email: string, action: string, name?: string, dob?: string) => {
    setLoading(true);
    try {
      const payload: Record<string, string> = { email, action };
      if (action === "signup") {
        if (!name || !dob) {
          throw new Error("Name and DOB are required for signup");
        }
        payload.name = name;
        payload.dob = dob;
      }
      await axios.post("/auth/send-otp", payload);
      setOtpSent(true);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/auth/verify-otp", { email, otp });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      setToken(token);
      setIsAuthenticated(true);
      fetchUserData(token);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (token: string) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    setOtpSent(false);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, token, user, error, otpSent, sendOtp, verifyOtp, fetchUserData, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
