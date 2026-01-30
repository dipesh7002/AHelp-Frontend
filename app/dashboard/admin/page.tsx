"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, LogOut, Send, Trash2, UserPlus, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { clearAuthTokens } from '@/utils/auth';
import { api } from '@/services/axiosConfig';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  email_verified: boolean;
}

interface Helper {
  id: number;
  user: User;
  rating: number | null;
  is_available: boolean;
  assigned_users_count: number;
}

interface Conversation {
  id: number;
  participant1: User;
  participant2: User;
  last_message: { text: string; created_at: string } | null;
}

interface Message {
  id: number;
  text: string;
  sender: User;
  receiver: User;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [helpers, setHelpers] = useState<Helper[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedHelper, setSelectedHelper] = useState<Helper | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'helpers' | 'conversations' | 'chat'>('users');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchHelpers();
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
      const interval = setInterval(() => {
        fetchMessages(selectedConversation.id);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedConversation]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/auth/user/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHelpers = async () => {
    try {
      const response = await api.get('/api/helper/assignment-helper/');
      setHelpers(response.data);
    } catch (error) {
      console.error('Error fetching helpers:', error);
    }
  };

  const fetchConversations = async () => {
    try {
      const response = await api.get('/api/chat/conversation/');
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

  const assignUserToHelper = async () => {
    if (!selectedUser || !selectedHelper) {
      alert('Please select both a user and a helper');
      return;
    }

    try {
      await api.post(`/api/helper/assignment-helper/${selectedHelper.id}/assign_user/`, {
        user_id: selectedUser.id
      });
      alert('User assigned successfully');
      setSelectedUser(null);
      setSelectedHelper(null);
      fetchHelpers();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to assign user');
    }
  };

  const deleteHelper = async (helperId: number) => {
    if (!confirm('Are you sure you want to delete this helper?')) return;

    try {
      await api.delete(`/api/helper/assignment-helper/${helperId}/`);
      alert('Helper deleted successfully');
      fetchHelpers();
    } catch (error) {
      alert('Failed to delete helper');
    }
  };

  const startConversation = async (userId: number) => {
    try {
      const response = await api.post('/api/chat/conversation/get_or_create/', {
        other_user_id: userId
      });
      setSelectedConversation(response.data);
      setActiveTab('chat');
      await fetchConversations();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to start conversation');
    }
  };

  const sendMessage = async () => {
    if (!messageText.trim() || !selectedConversation) return;

    try {
      await api.post('/api/chat/message/', {
        conversation: selectedConversation.id,
        text: messageText,
        sender_id: null,
        receiver_id: null
      });
      setMessageText('');
      await fetchMessages(selectedConversation.id);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleLogout = () => {
    clearAuthTokens();
    router.push('/signin');
  };

  const viewConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
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
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50">
          {[
            { id: 'users', label: 'All Users' },
            { id: 'helpers', label: 'Helpers' },
            { id: 'conversations', label: 'Conversations' },
            { id: 'chat', label: 'Chat' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                if (tab.id !== 'chat') setSelectedConversation(null);
              }}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-gray-200/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">All Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Verified</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{user.first_name} {user.last_name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                          user.role === 'helper' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {user.email_verified ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <span className="text-gray-400">✗</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => startConversation(user.id)}
                          className="px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 text-sm"
                        >
                          Chat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Helpers Tab */}
        {activeTab === 'helpers' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">All Helpers</h2>
              <div className="space-y-3">
                {helpers.map((helper) => (
                  <div
                    key={helper.id}
                    className="p-4 rounded-xl border border-gray-200 hover:border-indigo-300 bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {helper.user.first_name} {helper.user.last_name}
                        </h3>
                        <p className="text-sm text-gray-600">{helper.user.email}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Rating: {helper.rating || 'N/A'} • Assigned Users: {helper.assigned_users_count}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startConversation(helper.user.id)}
                          className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 text-sm"
                        >
                          Chat
                        </button>
                        <button
                          onClick={() => deleteHelper(helper.id)}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assign User to Helper */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Assign User to Helper</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select User</label>
                  <select
                    value={selectedUser?.id || ''}
                    onChange={(e) => {
                      const user = users.find(u => u.id === Number(e.target.value));
                      setSelectedUser(user || null);
                    }}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  >
                    <option value="">Select a user</option>
                    {users.filter(u => u.role === 'common').map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Helper</label>
                  <select
                    value={selectedHelper?.id || ''}
                    onChange={(e) => {
                      const helper = helpers.find(h => h.id === Number(e.target.value));
                      setSelectedHelper(helper || null);
                    }}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  >
                    <option value="">Select a helper</option>
                    {helpers.map((helper) => (
                      <option key={helper.id} value={helper.id}>
                        {helper.user.first_name} {helper.user.last_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={assignUserToHelper}
                className="px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Assign User
              </button>
            </div>
          </div>
        )}

        {/* Conversations Tab */}
        {activeTab === 'conversations' && (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-gray-200/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">All Conversations</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {conversations.map((conv) => (
                <motion.div
                  key={conv.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => viewConversation(conv)}
                  className="p-4 rounded-xl border border-gray-200 hover:border-indigo-300 cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {conv.participant1.first_name} {conv.participant1.last_name} ↔ {conv.participant2.first_name} {conv.participant2.last_name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {conv.last_message?.text || 'No messages yet'}
                      </p>
                    </div>
                    <Eye className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && selectedConversation && (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 flex flex-col" style={{ height: '600px' }}>
            <div className="px-6 py-4 border-b border-gray-200/50 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {selectedConversation.participant1.first_name} {selectedConversation.participant1.last_name} ↔ {selectedConversation.participant2.first_name} {selectedConversation.participant2.last_name}
                </h3>
                <p className="text-sm text-gray-500">Admin view</p>
              </div>
              <button
                onClick={() => {
                  setSelectedConversation(null);
                  setActiveTab('conversations');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Back
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender.id === selectedConversation.participant1.id ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      msg.sender.id === selectedConversation.participant1.id
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-indigo-500 text-white'
                    }`}
                  >
                    <p className="text-xs text-gray-500 mb-1">{msg.sender.email}</p>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender.id === selectedConversation.participant1.id ? 'text-gray-500' : 'text-indigo-100'}`}>
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
  );
}

