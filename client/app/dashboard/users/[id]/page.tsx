"use client";

import { useState } from 'react';
import DashboardContent from '@/app/components/DashboardContent';
import DashboardLayout from '@/app/components/DashboardLayout';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Globe, 
  Briefcase,
  Edit2,
  Save,
  X,
  Upload,
  Lock,
  Bell,
  CreditCard,
  Activity,
  LogOut
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
  bio: string;
  avatar: string;
  joinDate: string;
  lastActive: string;
  status: 'Active' | 'Away' | 'Offline';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Administrator',
    department: 'Engineering',
    location: 'San Francisco, CA',
    bio: 'Senior full-stack developer with 8+ years of experience in building scalable web applications. Passionate about clean code and user experience.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe',
    joinDate: 'March 15, 2022',
    lastActive: '2 minutes ago',
    status: 'Active',
    notifications: {
      email: true,
      push: false,
      sms: true
    }
  });

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationToggle = (type: keyof UserProfile['notifications']) => {
    setUser(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to API
    console.log('Saved user:', user);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data or fetch from API
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout pageTitle='User Profile'>
      <DashboardContent 
        title="User Profile"
        subtitle="Manage your account settings and preferences"
        showHeading={false}
      >
        {/* Header with Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.role} • {user.department}</p>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 text-gray-700 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar Section */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-32 w-32 rounded-2xl border-4 border-white shadow-lg"
                    />
                    {isEditing && (
                      <label className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700">
                        <Upload className="h-4 w-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <div className="mt-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' :
                      user.status === 'Away' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      <div className={`h-2 w-2 rounded-full mr-2 ${
                        user.status === 'Active' ? 'bg-green-500' :
                        user.status === 'Away' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`} />
                      {user.status}
                    </span>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={user.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{user.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Mail className="inline h-4 w-4 mr-1" />
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={user.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-600">{user.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Phone className="inline h-4 w-4 mr-1" />
                        Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={user.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-600">{user.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Shield className="inline h-4 w-4 mr-1" />
                        Role
                      </label>
                      {isEditing ? (
                        <select
                          value={user.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option>Administrator</option>
                          <option>Manager</option>
                          <option>Developer</option>
                          <option>Designer</option>
                          <option>Support</option>
                        </select>
                      ) : (
                        <p className="text-gray-600">{user.role}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Briefcase className="inline h-4 w-4 mr-1" />
                        Department
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={user.department}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                          className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-600">{user.department}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <MapPin className="inline h-4 w-4 mr-1" />
                        Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={user.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-600">{user.location}</p>
                      )}
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={user.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={3}
                        className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-600 whitespace-pre-line">{user.bio}</p>
                    )}
                  </div>

                  {/* Timeline Info */}
                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Joined:</span>
                      <span className="font-medium medium text-green-600">{user.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Last active:</span>
                      <span className="font-medium text-green-600">{user.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                    Enable 2FA
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    Change Password
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Active Sessions</p>
                    <p className="text-sm text-gray-600">2 devices currently active</p>
                  </div>
                  <button className="px-4 py-2 text-blue-600 hover:text-blue-800 text-sm">
                    View Sessions
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-6">
            {/* Notification Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </h3>
              <div className="space-y-4">
                {Object.entries(user.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-900 capitalize">{key} Notifications</span>
                    <button
                      onClick={() => handleNotificationToggle(key as keyof typeof user.notifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        value ? 'bg-blue-600' : 'bg-gray-300'
                      } transition-colors`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Billing & Subscription</span>
                </button>
                <button className="w-full px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Language & Region</span>
                </button>
                <button className="w-full px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Privacy Settings</span>
                </button>
                <button className="w-full px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-red-50 text-red-600 flex items-center gap-3">
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm text-gray-700">Sign Out All Devices</span>
                </button>
              </div>
            </div>

            {/* Account Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Profile Updated</p>
                  <p className="text-gray-600">Yesterday at 2:30 PM</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Password Changed</p>
                  <p className="text-gray-600">3 days ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">New Device Login</p>
                  <p className="text-gray-600">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
}