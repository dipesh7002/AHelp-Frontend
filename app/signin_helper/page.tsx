"use client"

import React, { useState } from 'react';
import { Upload, User, Mail, GraduationCap, X, CheckCircle, Eye, EyeOff } from 'lucide-react';
import NavBar from '../components/NavBar';

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  userImage: File | null;
  profilePicture: File | null;
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
    gender: '',
    userImage: null,
    profilePicture: null,
    education: ''
  });

  const [userImagePreview, setUserImagePreview] = useState<string>('');
  const [ppPreview, setPpPreview] = useState<string>('');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'userImage' | 'profilePicture') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [type]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'userImage') {
          setUserImagePreview(reader.result as string);
        } else {
          setPpPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (type: 'userImage' | 'profilePicture') => {
    setFormData(prev => ({ ...prev, [type]: null }));
    if (type === 'userImage') {
      setUserImagePreview('');
    } else {
      setPpPreview('');
    }
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
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.education) newErrors.education = 'Education is required';
    if (!formData.userImage && !formData.profilePicture) {
      newErrors.profilePicture = 'At least one profile image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const userFormData = new FormData();
      userFormData.append('first_name', formData.firstName);
      if (formData.middleName) userFormData.append('middle_name', formData.middleName);
      userFormData.append('last_name', formData.lastName);
      userFormData.append('email', formData.email);
      userFormData.append('password', formData.password);
      userFormData.append('gender', formData.gender);
      if (formData.userImage) userFormData.append('image', formData.userImage);

      const userResponse = await fetch('/api/users/', {
        method: 'POST',
        body: userFormData,
      });

      if (!userResponse.ok) {
        throw new Error('Failed to create user');
      }

      const userData = await userResponse.json();

      const helperFormData = new FormData();
      helperFormData.append('user', userData.id);
      helperFormData.append('education', formData.education);
      if (formData.profilePicture) {
        helperFormData.append('pp', formData.profilePicture);
      }

      const helperResponse = await fetch('/api/assignment-helpers/', {
        method: 'POST',
        body: helperFormData,
      });

      if (!helperResponse.ok) {
        throw new Error('Failed to create assignment helper profile');
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        window.location.href = '/dashboard';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-md w-full text-center border border-white/20">
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
            Registration Successful!
          </h2>
          <p className="text-gray-600 text-lg">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Simple Modern Navbar */}
    <NavBar />

      {/* Main Content */}
      <div className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-4">
              Join as Helper
            </h1>
            <p className="text-gray-600 text-lg">Start your journey as an assignment helper today</p>
          </div>

          {/* Form Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/20">
            <div className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition ${
                        errors.firstName ? 'border-red-400' : 'border-gray-200'
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
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition"
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
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition ${
                      errors.lastName ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1.5">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition ${
                      errors.gender ? 'border-red-400' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm mt-1.5">{errors.gender}</p>}
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
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
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition ${
                      errors.email ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1.5">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition pr-12 ${
                          errors.password ? 'border-red-400' : 'border-gray-200'
                        }`}
                        placeholder="Min. 8 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
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
                        className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition pr-12 ${
                          errors.confirmPassword ? 'border-red-400' : 'border-gray-200'
                        }`}
                        placeholder="Repeat password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
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
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
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
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition ${
                      errors.education ? 'border-red-400' : 'border-gray-200'
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

              {/* Profile Images */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Profile Images</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                    {ppPreview ? (
                      <div className="relative group">
                        <img src={ppPreview} alt="Profile preview" className="w-full h-48 object-cover rounded-2xl" />
                        <button
                          type="button"
                          onClick={() => removeImage('profilePicture')}
                          className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition shadow-lg opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition group">
                        <Upload className="w-10 h-10 text-gray-400 group-hover:text-blue-500 mb-2 transition" />
                        <span className="text-sm text-gray-500 group-hover:text-blue-600 transition">Click to upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'profilePicture')}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
                {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture}</p>}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
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
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelperRegistrationForm;