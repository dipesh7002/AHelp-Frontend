"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, XCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/services/axiosConfig';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (token && email) {
      verifyEmail(token, email);
    } else {
      setStatus('error');
      setMessage('Invalid verification link');
    }
  }, [searchParams]);

  const verifyEmail = async (token: string, email: string) => {
    try {
      const response = await api.post('/api/auth/verify-email/', {
        token,
        email
      });

      if (response.status === 200) {
        setStatus('success');
        setMessage('Email verified successfully! You can now log in.');
        setTimeout(() => {
          router.push('/signin');
        }, 3000);
      }
    } catch (error: any) {
      setStatus('error');
      setMessage(error.response?.data?.error || 'Verification failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20 max-w-md w-full text-center"
      >
        {status === 'loading' && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-4"
            >
              <Mail className="w-16 h-16 text-indigo-500" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email...</h1>
            <p className="text-gray-600">Please wait while we verify your email address.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-4"
            >
              <CheckCircle className="w-16 h-16 text-green-500" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to login page...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-4"
            >
              <XCircle className="w-16 h-16 text-red-500" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => router.push('/signin')}
              className="px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors"
            >
              Go to Login
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}

