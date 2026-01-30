"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Users, LogOut, Search, Star, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { clearAuthTokens } from '@/utils/auth';
import { api } from '@/services/axiosConfig';

interface Writer {
  id: number;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  pp: string | null;
  rating: number | null;
  rating_display: string;
  is_available: boolean;
}

interface Conversation {
  id: number;
  participant1: { id: number; email: string; first_name: string , last_name: string};
  participant2: { id: number; email: string; first_name: string, last_name: string};
  last_message: { text: string; created_at: string } | null;
  unread_count: number;
}

export default function UserDashboard() {
  const router = useRouter();
  const [writers, setWriters] = useState<Writer[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedWriter, setSelectedWriter] = useState<Writer | null>(null);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  useEffect(() => {
    fetchWriters();
    fetchConversations();
  }, []);

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.id);
    }
  }, [activeConversation]);

  const fetchWriters = async () => {
    try {
      const response = await api.get('/api/helper/assignment-helper/');
      setWriters(response.data);
    } catch (error) {
      console.error('Error fetching writers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConversations = async () => {
    try {
      const response = await api.get('/api/chat/conversation/my_conversations/');
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchMessages = async (conversationId: number) => {
    try {
      const response = await api.get(`/api/chat/message/?conversation_id=${conversationId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const startConversation = async (writerId: number) => {
    try {
      const response = await api.post('/api/chat/conversation/get_or_create/', {
        other_user_id: writerId
      });
      setActiveConversation(response.data);
      await fetchConversations();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to start conversation');
    }
  };

  const sendMessage = async () => {
    if (!messageText.trim() || !activeConversation) return;

    try {
      await api.post('/api/chat/message/', {
        conversation: activeConversation.id,
        text: messageText,
        sender_id: null, // Will be set by backend
        receiver_id: null
      });
      setMessageText('');
      await fetchMessages(activeConversation.id);
      await fetchConversations();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleLogout = () => {
    clearAuthTokens();
    router.push('/signin');
  };

  const filteredWriters = filterRating
    ? writers.filter(w => w.rating && w.rating >= filterRating)
    : writers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              User Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Writers List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Writers</h2>
              
              {/* Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Rating
                </label>
                <select
                  value={filterRating || ''}
                  onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                >
                  <option value="">All Ratings</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading writers...</div>
                ) : filteredWriters.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No writers available</div>
                ) : (
                  filteredWriters.map((writer) => (
                    <motion.div
                      key={writer.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedWriter?.id === writer.id
                          ? 'bg-indigo-50 border-indigo-300'
                          : 'bg-gray-50 border-gray-200 hover:border-indigo-200'
                      }`}
                      onClick={() => setSelectedWriter(writer)}
                    >
                      <div className="flex items-center gap-3">
                        {writer.pp ? (
                          <img
                            src={writer.pp}
                            alt={writer.user.first_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                            {writer.user.first_name[0]}
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {writer.user.first_name} {writer.user.last_name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{writer.rating_display}</span>
                            {writer.is_available && (
                              <span className="ml-2 text-green-600">• Available</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startConversation(writer.user.id);
                          }}
                          className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm"
                        >
                          Chat
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Conversations & Chat */}
          <div className="lg:col-span-2 space-y-4">
            {/* Conversations List */}
            {!activeConversation && (
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-gray-200/50">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Conversations</h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {conversations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No conversations yet. Start chatting with a writer!
                    </div>
                  ) : (
                    conversations.map((conv) => (
                      <motion.div
                        key={conv.id}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => setActiveConversation(conv)}
                        className="p-4 rounded-xl border border-gray-200 hover:border-indigo-300 cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {conv.participant1.first_name} {conv.participant1.last_name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {conv.last_message?.text || 'No messages yet'}
                            </p>
                          </div>
                          {conv.unread_count > 0 && (
                            <span className="px-2 py-1 bg-indigo-500 text-white rounded-full text-xs">
                              {conv.unread_count}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Chat Interface */}
            {activeConversation && (
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 flex flex-col" style={{ height: '600px' }}>
                <div className="px-6 py-4 border-b border-gray-200/50 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {activeConversation.participant1.first_name} {activeConversation.participant1.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">Active conversation</p>
                  </div>
                  <button
                    onClick={() => setActiveConversation(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender.id === activeConversation.participant1.id ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                          msg.sender.id === activeConversation.participant1.id
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-indigo-500 text-white'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender.id === activeConversation.participant1.id ? 'text-gray-500' : 'text-indigo-100'}`}>
                          {new Date(msg.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                  className="px-6 py-4 border-t border-gray-200/50 flex gap-3"
                >
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

