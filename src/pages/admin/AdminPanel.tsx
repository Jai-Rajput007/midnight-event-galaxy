
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../contexts/EventContext';
import { useSponsors } from '../../contexts/SponsorContext';
import { useFaqs } from '../../contexts/FaqContext';
import { Calendar, User, Users, HelpCircle, Award, Clock, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const AdminPanel = () => {
  const { user } = useAuth();
  const { events } = useEvents();
  const { sponsors } = useSponsors();
  const { faqs } = useFaqs();
  
  // Get countdown date from localStorage or use default
  const savedCountdownDate = localStorage.getItem('timelapse_countdown_date') || '2025-01-01T00:00:00';
  const [countdownDate, setCountdownDate] = useState(savedCountdownDate.substring(0, 10));
  const [countdownTime, setCountdownTime] = useState(savedCountdownDate.substring(11, 16));
  
  if (!user || user.role !== 'admin') return null;

  // Get registration statistics
  const totalRegistrations = events.reduce(
    (sum, event) => sum + event.registrations.length,
    0
  );
  
  // Get unique users registered (in a real app this would be more complex)
  const uniqueUsers = new Set();
  events.forEach(event => {
    event.registrations.forEach(userId => uniqueUsers.add(userId));
  });

  // Handle save countdown settings
  const saveCountdownSettings = () => {
    const newCountdownDate = `${countdownDate}T${countdownTime}:00`;
    localStorage.setItem('timelapse_countdown_date', newCountdownDate);
    toast.success('Countdown settings saved successfully');
  };

  return (
    <div className="animate-float-up">
      {/* Header */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-900/30 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">
            Manage events, sponsors, and settings for Timelapse 2k25
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-purple-900/40 to-purple-700/20 border-purple-500/30 hover-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 mb-1 text-sm">Total Events</p>
                  <h3 className="text-white text-3xl font-bold">{events.length}</h3>
                </div>
                <span className="rounded-full bg-purple-400/20 p-2">
                  <Calendar size={20} className="text-purple-400" />
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-900/40 to-blue-700/20 border-blue-500/30 hover-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 mb-1 text-sm">Sponsors</p>
                  <h3 className="text-white text-3xl font-bold">{sponsors.length}</h3>
                </div>
                <span className="rounded-full bg-blue-400/20 p-2">
                  <Award size={20} className="text-blue-400" />
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-900/40 to-green-700/20 border-green-500/30 hover-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 mb-1 text-sm">Registrations</p>
                  <h3 className="text-white text-3xl font-bold">{totalRegistrations}</h3>
                </div>
                <span className="rounded-full bg-green-400/20 p-2">
                  <User size={20} className="text-green-400" />
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-900/40 to-amber-700/20 border-amber-500/30 hover-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 mb-1 text-sm">FAQs</p>
                  <h3 className="text-white text-3xl font-bold">{faqs.length}</h3>
                </div>
                <span className="rounded-full bg-amber-400/20 p-2">
                  <HelpCircle size={20} className="text-amber-400" />
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Countdown Settings */}
        <Card className="mb-8 glass-card hover-card">
          <CardHeader className="bg-gradient-to-r from-indigo-900/40 to-indigo-700/20 pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-semibold text-white flex items-center">
                <Clock className="h-5 w-5 mr-2 text-indigo-400" />
                Countdown Settings
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-400 mb-6">
              Manage the main countdown timer displayed on the homepage.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Target Date</label>
                <Input 
                  type="date"
                  value={countdownDate} 
                  onChange={(e) => setCountdownDate(e.target.value)}
                  className="bg-black/50 border-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Target Time</label>
                <Input 
                  type="time"
                  value={countdownTime}
                  onChange={(e) => setCountdownTime(e.target.value)}
                  className="bg-black/50 border-gray-700"
                />
              </div>
            </div>
            
            <Button 
              onClick={saveCountdownSettings}
              className="mt-6 w-full md:w-auto"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Countdown Settings
            </Button>
          </CardContent>
        </Card>
        
        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Events Management */}
          <Card className="glass-card hover-card overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-purple-900 to-purple-700"></div>
            <CardHeader className="bg-gradient-to-r from-purple-900/40 to-purple-700/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold text-white">Events</CardTitle>
                <Calendar size={24} className="text-purple-400" />
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <p className="text-gray-400 mb-6">
                Manage all events, create new ones, and track registrations.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-white">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mr-2"></div>
                  Create and publish new events
                </li>
                <li className="flex items-center text-white">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mr-2"></div>
                  Edit event details and schedules
                </li>
                <li className="flex items-center text-white">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mr-2"></div>
                  Track registrations and attendance
                </li>
                <li className="flex items-center text-white">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mr-2"></div>
                  Manage event categories
                </li>
              </ul>
              
              <Button asChild className="w-full group">
                <Link to="/admin/events">
                  Manage Events
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Sponsors Management */}
          <Card className="glass-card hover-card overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-900 to-blue-700"></div>
            <CardHeader className="bg-gradient-to-r from-blue-900/40 to-blue-700/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold text-white">Sponsors</CardTitle>
                <Award size={24} className="text-blue-400" />
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <p className="text-gray-400 mb-6">
                Add new sponsors, manage sponsorship tiers, and update sponsor information.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-white">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                  Add new sponsor organizations
                </li>
                <li className="flex items-center text-white">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                  Assign sponsorship levels
                </li>
                <li className="flex items-center text-white">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                  Update sponsor logos and details
                </li>
                <li className="flex items-center text-white">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                  Track sponsor contributions
                </li>
              </ul>
              
              <Button asChild className="w-full group">
                <Link to="/admin/sponsors">
                  Manage Sponsors
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* FAQ Management */}
          <Card className="glass-card hover-card overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-amber-900 to-amber-700"></div>
            <CardHeader className="bg-gradient-to-r from-amber-900/40 to-amber-700/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold text-white">FAQs</CardTitle>
                <HelpCircle size={24} className="text-amber-400" />
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <p className="text-gray-400 mb-6">
                Create and organize frequently asked questions to help attendees.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-white">
                  <div className="h-2 w-2 bg-amber-500 rounded-full mr-2"></div>
                  Create new FAQ entries
                </li>
                <li className="flex items-center text-white">
                  <div className="h-2 w-2 bg-amber-500 rounded-full mr-2"></div>
                  Organize FAQs by category
                </li>
                <li className="flex items-center text-white">
                  <div className="h-2 w-2 bg-amber-500 rounded-full mr-2"></div>
                  Update existing questions and answers
                </li>
                <li className="flex items-center text-white">
                  <div className="h-2 w-2 bg-amber-500 rounded-full mr-2"></div>
                  Remove outdated information
                </li>
              </ul>
              
              <Button asChild className="w-full group">
                <Link to="/admin/faq">
                  Manage FAQs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

import { ArrowRight } from 'lucide-react';

export default AdminPanel;
