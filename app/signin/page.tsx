"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import Link from "next/link";
import NavBar from "../components/NavBar";
import { useRouter } from 'next/navigation';
import useLoginUser from "@/hooks/usePostCommonUser";

const SignInPage = () => {
  const {loginUser} = useLoginUser()
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
  try {
    const tokens = await loginUser({
      email,
      password,
    });

    // Redirect based on role
    if (tokens.role === 'helper' && tokens.email_verified) {
      router.push("/dashboard/helper");
    } else if (tokens.role === 'helper' && !tokens.email_verified) {
      setError("Please verify your email before logging in. Check your inbox.");
    } else if (tokens.role === 'admin') {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/user");
    }
  } catch (e) {
    setError("Invalid email or password. Please try again.");
  } finally {
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NavBar />

      <div className="flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20 max-w-md w-full"
        >
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-8">
            Welcome Back
          </h1>

          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-white text-black border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 bg-white text-black border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}

            {/* Sign In Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleSignIn}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex justify-center items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex justify-center items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Sign In
                </span>
              )}
            </motion.button>

            {/* Registration Link */}
            <p className="text-center text-gray-700 mt-4">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Register here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignInPage;
