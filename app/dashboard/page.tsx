"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Home, LogOut, User, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const DashboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'home' | 'chat'>('home');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to AHelp. How can I assist you today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: "Thank you for your message. I'm here to help you with your assignments and questions. How can I assist you further?",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleLogout = () => {
    // Clear any auth tokens/localStorage if needed
    router.push('/signin');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 30
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center"
              >
                <MessageSquare className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AHelp Dashboard
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-6 bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50 shadow-sm"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('home')}
            className={`relative flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'home'
                ? 'text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {activeTab === 'home' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('chat')}
            className={`relative flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'chat'
                ? 'text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {activeTab === 'chat' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span>Chat</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Home Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Welcome Card */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-200/50"
              >
                <div className="flex items-start gap-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0"
                  >
                    <User className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                    <p className="text-gray-600 text-lg mb-4">
                      You're all set to get help with your assignments. Our team of expert helpers is ready to assist you.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab('chat')}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Start Chatting
                    </motion.button>
                  </div>
                </div>
              </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-medium">Active Chats</h3>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center"
                  >
                    <MessageSquare className="w-6 h-6 text-indigo-600" />
                  </motion.div>
                </div>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-3xl font-bold text-gray-900"
                >
                  {messages.length}
                </motion.p>
                <p className="text-sm text-gray-500 mt-1">Total messages</p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-medium">Response Time</h3>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                    className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"
                  >
                    <Send className="w-6 h-6 text-green-600" />
                  </motion.div>
                </div>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="text-3xl font-bold text-gray-900"
                >
                  &lt;1min
                </motion.p>
                <p className="text-sm text-gray-500 mt-1">Average response</p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-medium">Satisfaction</h3>
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                    className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center"
                  >
                    <User className="w-6 h-6 text-purple-600" />
                  </motion.div>
                </div>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                  className="text-3xl font-bold text-gray-900"
                >
                  98%
                </motion.p>
                <p className="text-sm text-gray-500 mt-1">User satisfaction</p>
              </motion.div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-200/50"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('chat')}
                  className="flex items-center gap-4 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl hover:from-indigo-100 hover:to-purple-100 transition-all border border-indigo-200/50"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center"
                  >
                    <MessageSquare className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Start New Chat</h4>
                    <p className="text-sm text-gray-600">Get help with your assignments</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl hover:from-blue-100 hover:to-cyan-100 transition-all border border-blue-200/50"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center"
                  >
                    <User className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">View Profile</h4>
                    <p className="text-sm text-gray-600">Manage your account settings</p>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden flex flex-col"
              style={{ height: 'calc(100vh - 280px)', minHeight: '600px' }}
            >
              {/* Chat Header */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                    className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center"
                  >
                    <User className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AHelp Assistant</h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm text-gray-500"
                    >
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Online
                      </motion.span>
                      {' • '}Usually replies instantly
                    </motion.p>
                  </div>
                </div>
              </motion.div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50/50">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-sm'
                          : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm shadow-sm'
                      }`}
                    >
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm leading-relaxed"
                      >
                        {message.text}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-indigo-100' : 'text-gray-400'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex justify-start"
                  >
                    <motion.div
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm"
                    >
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{
                              y: [0, -8, 0],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSendMessage}
              className="px-6 py-4 border-t border-gray-200/50 bg-white/50"
            >
              <div className="flex items-end gap-3">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="flex-1 relative"
                >
                  <motion.input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    whileFocus={{ scale: 1.01 }}
                    className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  whileHover={inputMessage.trim() && !isTyping ? { scale: 1.1, rotate: 5 } : {}}
                  whileTap={inputMessage.trim() && !isTyping ? { scale: 0.9 } : {}}
                  className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                >
                  <motion.div
                    animate={inputMessage.trim() ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DashboardPage;

