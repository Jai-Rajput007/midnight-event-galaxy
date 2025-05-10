
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEvents } from '../../contexts/EventContext';
import { useSponsors } from '../../contexts/SponsorContext';
import { useFaqs } from '../../contexts/FaqContext';
import { Calendar, User, Users, HelpCircle, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminPanel = () => {
  const { user } = useAuth();
  const { events } = useEvents();
  const { sponsors } = useSponsors();
  const { faqs } = useFaqs();
  
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

  return (
    <div className="animate-float-up">
      {/* Header */}
      <section className="py-16 px-4 bg-gradient-to-b from-moonstone-muted/50 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">
            Manage events, sponsors, and FAQs for Moonstone 2k25
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-700/20 rounded-lg p-6 border border-purple-500/30">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Total Events</p>
                <h3 className="text-white text-3xl font-bold">{events.length}</h3>
              </div>
              <span className="rounded-full bg-purple-400/20 p-2">
                <Calendar size={20} className="text-purple-400" />
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-700/20 rounded-lg p-6 border border-blue-500/30">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Sponsors</p>
                <h3 className="text-white text-3xl font-bold">{sponsors.length}</h3>
              </div>
              <span className="rounded-full bg-blue-400/20 p-2">
                <Award size={20} className="text-blue-400" />
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-900/40 to-green-700/20 rounded-lg p-6 border border-green-500/30">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Registrations</p>
                <h3 className="text-white text-3xl font-bold">{totalRegistrations}</h3>
              </div>
              <span className="rounded-full bg-green-400/20 p-2">
                <User size={20} className="text-green-400" />
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-900/40 to-amber-700/20 rounded-lg p-6 border border-amber-500/30">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">FAQs</p>
                <h3 className="text-white text-3xl font-bold">{faqs.length}</h3>
              </div>
              <span className="rounded-full bg-amber-400/20 p-2">
                <HelpCircle size={20} className="text-amber-400" />
              </span>
            </div>
          </div>
        </div>
        
        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Events Management */}
          <div className="bg-moonstone-muted rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-900/40 to-purple-700/20 p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Events</h2>
                <Calendar size={24} className="text-purple-400" />
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-400 mb-6">
                Manage all events, create new ones, and track registrations.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="text-white">• Create and publish new events</li>
                <li className="text-white">• Edit event details and schedules</li>
                <li className="text-white">• Track registrations and attendance</li>
                <li className="text-white">• Manage event categories</li>
              </ul>
              
              <Button asChild className="w-full">
                <Link to="/admin/events">Manage Events</Link>
              </Button>
            </div>
          </div>
          
          {/* Sponsors Management */}
          <div className="bg-moonstone-muted rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900/40 to-blue-700/20 p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Sponsors</h2>
                <Award size={24} className="text-blue-400" />
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-400 mb-6">
                Add new sponsors, manage sponsorship tiers, and update sponsor information.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="text-white">• Add new sponsor organizations</li>
                <li className="text-white">• Assign sponsorship levels</li>
                <li className="text-white">• Update sponsor logos and details</li>
                <li className="text-white">• Track sponsor contributions</li>
              </ul>
              
              <Button asChild className="w-full">
                <Link to="/admin/sponsors">Manage Sponsors</Link>
              </Button>
            </div>
          </div>
          
          {/* FAQ Management */}
          <div className="bg-moonstone-muted rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-900/40 to-amber-700/20 p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">FAQs</h2>
                <HelpCircle size={24} className="text-amber-400" />
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-400 mb-6">
                Create and organize frequently asked questions to help attendees.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="text-white">• Create new FAQ entries</li>
                <li className="text-white">• Organize FAQs by category</li>
                <li className="text-white">• Update existing questions and answers</li>
                <li className="text-white">• Remove outdated information</li>
              </ul>
              
              <Button asChild className="w-full">
                <Link to="/admin/faq">Manage FAQs</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
