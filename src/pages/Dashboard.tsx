
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import EventCard from '../components/EventCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user } = useAuth();
  const { events, unregisterFromEvent } = useEvents();
  
  if (!user) return null;
  
  // Get events the user has registered for
  const registeredEvents = events.filter(event => 
    event.registrations.includes(user.id)
  );
  
  // Get upcoming events (events that haven't happened yet)
  const today = new Date();
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today;
  }).slice(0, 3); // Get only 3 upcoming events
  
  // Handle unregistration
  const handleUnregister = (eventId: string) => {
    unregisterFromEvent(eventId, user.id);
    toast.success('Successfully unregistered from the event');
  };

  return (
    <div className="animate-float-up">
      {/* Header Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-moonstone-muted/50 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome, {user.name}</h1>
          <p className="text-gray-300 mb-8">
            Manage your events and account details
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Profile */}
          <div className="lg:col-span-1">
            <div className="bg-moonstone-muted rounded-lg p-6 mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-moonstone-accent flex items-center justify-center text-white text-xl">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-white text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-4 border-t border-moonstone-accent pt-4">
                <div className="flex items-center">
                  <User size={18} className="text-gray-400 mr-2" />
                  <span className="text-gray-300">Student Account</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-400 mr-2" />
                  <span className="text-gray-300">{registeredEvents.length} Events Registered</span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="text-gray-400 mr-2" />
                  <span className="text-gray-300">Joined {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-moonstone-muted rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/events">Browse All Events</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/sponsors">View Sponsors</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/faq">View FAQ</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Events */}
          <div className="lg:col-span-2">
            {/* Registered Events */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Your Registered Events</h2>
              
              {registeredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {registeredEvents.map((event) => (
                    <EventCard 
                      key={event.id} 
                      event={event}
                      isRegistered={true}
                      onUnregister={() => handleUnregister(event.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-moonstone-muted rounded-lg p-8 text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">No events registered</h3>
                  <p className="text-gray-400 mb-6">
                    You haven't registered for any events yet. Browse our upcoming events and sign up!
                  </p>
                  <Button asChild>
                    <Link to="/events">Explore Events</Link>
                  </Button>
                </div>
              )}
            </div>
            
            {/* Upcoming Events Suggestions */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Recommended For You</h2>
              
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard 
                      key={event.id} 
                      event={event}
                      isRegistered={event.registrations.includes(user.id)}
                      onRegister={() => {
                        if (!event.registrations.includes(user.id)) {
                          unregisterFromEvent(event.id, user.id);
                          toast.success('Successfully registered for the event');
                        }
                      }}
                      onUnregister={() => handleUnregister(event.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-moonstone-muted rounded-lg p-8 text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">No upcoming events</h3>
                  <p className="text-gray-400">
                    Check back soon for new events!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
