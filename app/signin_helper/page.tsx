"use client"

import React, { useState } from 'react';
import { Upload, User, Mail, GraduationCap, X, CheckCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import NavBar from '../components/NavBar';
import useRegisterHelper from '@/hooks/useRegisterWriters';

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage: File | null;
  education: string;
}

interface Education {
  id: number;
  name: string;
}

const HelperRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
    education: ''
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { registerUser } = useRegisterHelper();

  const educationLevels: Education[] = [
    { id: 1, name: 'High School' },
    { id: 2, name: 'Bachelor\'s Degree' },
    { id: 3, name: 'Master\'s Degree' },
    { id: 4, name: 'PhD' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, profileImage: null }));
    setImagePreview('');
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.education) newErrors.education = 'Education is required';
    if (!formData.profileImage) {
      newErrors.profileImage = 'Profile image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !formData.profileImage) return;

    setIsSubmitting(true);

    try {
      await registerUser({
        first_name: formData.firstName,
        middle_name: formData.middleName || undefined,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        education: formData.education,
        pp: formData.profileImage
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        window.location.href = '/signin';
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ email: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 max-w-md w-full text-center border border-white/30 animate-in fade-in duration-500">
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-in zoom-in duration-500">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
            Registration Successful!
          </h2>
          <p className="text-gray-600 text-lg">Redirecting to sign in...</p>
          <div className="mt-6 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <NavBar />

      {/* Main Content */}
      <div className="py-12 px-4 sm:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Join as Helper
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">Start your journey as an assignment helper today</p>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/30">
            <div className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200/60">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/90 border rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all ${
                        errors.firstName ? 'border-red-400 ring-2 ring-red-400/50' : 'border-gray-200 text-black hover:border-gray-300'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1.5">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/90 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all text-black hover:border-gray-300"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/90 border rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all ${
                      errors.lastName ? 'border-red-400 ring-2 ring-red-400/50' : 'border-gray-200 text-black hover:border-gray-300'
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1.5">{errors.lastName}</p>}
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200/60">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/90 border rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all ${
                      errors.email ? 'border-red-400 ring-2 ring-red-400/50' : 'border-gray-200 text-black hover:border-gray-300'
                    }`}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1.5">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/90 border rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all pr-12 ${
                          errors.password ? 'border-red-400 ring-2 ring-red-400/50' : 'border-gray-200 text-black hover:border-gray-300'
                        }`}
                        placeholder="Min. 8 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1.5">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/90 border rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all pr-12 ${
                          errors.confirmPassword ? 'border-red-400 ring-2 ring-red-400/50' : 'border-gray-200 text-black hover:border-gray-300'
                        }`}
                        placeholder="Repeat password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1.5">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200/60">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-md">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Professional Information</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education Level *</label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/90 border rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all ${
                      errors.education ? 'border-red-400 ring-2 ring-red-400/50' : 'border-gray-200 text-black hover:border-gray-300'
                    }`}
                  >
                    <option value="">Select Education Level</option>
                    {educationLevels.map(edu => (
                      <option key={edu.id} value={edu.id}>{edu.name}</option>
                    ))}
                  </select>
                  {errors.education && <p className="text-red-500 text-sm mt-1.5">{errors.education}</p>}
                </div>
              </div>

              {/* Profile Image */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200/60">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Profile Image</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture *</label>
                  {imagePreview ? (
                    <div className="relative group">
                      <img src={imagePreview} alt="Profile preview" className="w-full h-64 object-cover rounded-2xl shadow-lg" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-3 right-3 bg-red-500 text-white p-2.5 rounded-xl hover:bg-red-600 transition-all shadow-lg opacity-0 group-hover:opacity-100 hover:scale-110"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-3 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all">
                        <Upload className="w-8 h-8 text-indigo-500 group-hover:text-indigo-600 transition" />
                      </div>
                      <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-600 transition">Click to upload profile picture</span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                  {errors.profileImage && <p className="text-red-500 text-sm mt-1.5">{errors.profileImage}</p>}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Register as Assignment Helper'
                )}
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-600 mt-8">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelperRegistrationForm;