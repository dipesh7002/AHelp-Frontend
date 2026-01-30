"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, LogOut, Send, ToggleLeft, ToggleRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { clearAuthTokens } from '@/utils/auth';
import { api } from '@/services/axiosConfig';

interface AssignedUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface Conversation {
  id: number;
  participant1: { id: number; email: string; first_name: string; last_name: string };
  participant2: { id: number; email: string; first_name: string; last_name: string };
  last_message: { text: string; created_at: string } | null;
  unread_count: number;
}

interface Message {
  id: number;
  text: string;
  sender: { id: number; email: string; first_name: string };
  receiver: { id: number; email: string; first_name: string };
  created_at: string;
  is_read: boolean;
}

export default function HelperDashboard() {
  const router = useRouter();
  const [assignedUsers, setAssignedUsers] = useState<AssignedUser[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignedUsers();
    fetchConversations();
    fetchAvailability();
  }, []);

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.id);
      const interval = setInterval(() => {
        fetchMessages(activeConversation.id);
        fetchConversations();
      }, 3000); // Poll every 3 seconds
      return () => clearInterval(interval);
    }
  }, [activeConversation]);

  const fetchAssignedUsers = async () => {
    try {
      // Get helper's own profile to get assigned users
      const helperResponse = await api.get('/api/helper/assignment-helper/');
      if (helperResponse.data.length > 0) {
        const helperId = helperResponse.data[0].id;
        const response = await api.get(`/api/helper/assignment-helper/${helperId}/assigned_users/`);
        setAssignedUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching assigned users:', error);
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

  const fetchAvailability = async () => {
    try {
      const helperResponse = await api.get('/api/helper/assignment-helper/');
      if (helperResponse.data.length > 0) {
        setIsAvailable(helperResponse.data[0].is_available);
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const updateAvailability = async () => {
    try {
      const helperResponse = await api.get('/api/helper/assignment-helper/');
      if (helperResponse.data.length > 0) {
        const helperId = helperResponse.data[0].id;
        await api.post(`/api/helper/assignment-helper/${helperId}/update_availability/`, {
          is_available: !isAvailable
        });
        setIsAvailable(!isAvailable);
      }
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const startConversation = async (userId: number) => {
    try {
      const response = await api.post('/api/chat/conversation/get_or_create/', {
        other_user_id: userId
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
        sender_id: null,
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

  const getOtherParticipant = (conv: Conversation) => {
    // This is a simplified version - in real app, you'd get current user ID from auth
    return conv.participant1; // Assuming participant1 is the other user
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Helper Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={updateAvailability}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isAvailable ? (
                  <>
                    <ToggleRight className="w-5 h-5 text-green-500" />
                    <span>Available</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-5 h-5 text-gray-400" />
                    <span>Unavailable</span>
                  </>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assigned Users */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Assigned Users</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : assignedUsers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No assigned users yet
                  </div>
                ) : (
                  assignedUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-xl border border-gray-200 hover:border-indigo-300 bg-gray-50 hover:bg-indigo-50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {user.first_name} {user.last_name}
                          </h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <button
                          onClick={() => startConversation(user.id)}
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
            {!activeConversation && (
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-gray-200/50">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Conversations</h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {conversations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No active conversations
                    </div>
                  ) : (
                    conversations.map((conv) => {
                      const otherUser = getOtherParticipant(conv);
                      return (
                        <motion.div
                          key={conv.id}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => setActiveConversation(conv)}
                          className="p-4 rounded-xl border border-gray-200 hover:border-indigo-300 cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {otherUser.first_name} {otherUser.last_name}
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
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {activeConversation && (
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 flex flex-col" style={{ height: '600px' }}>
                <div className="px-6 py-4 border-b border-gray-200/50 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {getOtherParticipant(activeConversation).first_name} {getOtherParticipant(activeConversation).last_name}
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
                      className={`flex ${msg.sender.id === getOtherParticipant(activeConversation).id ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                          msg.sender.id === getOtherParticipant(activeConversation).id
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-indigo-500 text-white'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender.id === getOtherParticipant(activeConversation).id ? 'text-gray-500' : 'text-indigo-100'}`}>
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

