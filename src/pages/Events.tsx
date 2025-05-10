
import React, { useState } from 'react';
import { useEvents } from '../contexts/EventContext';
import { useAuth } from '../contexts/AuthContext';
import EventCard from '../components/EventCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { toast } from 'sonner';

const Events = () => {
  const { events, registerForEvent, unregisterFromEvent } = useEvents();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter events based on search term
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Check if user is registered for an event
  const isRegisteredForEvent = (eventId: string) => {
    if (!user) return false;
    const event = events.find(e => e.id === eventId);
    return event ? event.registrations.includes(user.id) : false;
  };
  
  // Handle event registration
  const handleRegister = (eventId: string) => {
    if (!user) {
      toast.error('Please log in to register for events');
      return;
    }
    
    registerForEvent(eventId, user.id);
    toast.success('Successfully registered for the event');
  };
  
  // Handle event unregistration
  const handleUnregister = (eventId: string) => {
    if (!user) return;
    
    unregisterFromEvent(eventId, user.id);
    toast.success('Successfully unregistered from the event');
  };

  return (
    <div className="animate-float-up">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Events</h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover and register for our upcoming tech and innovation events.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search events..."
              className="pl-10 bg-moonstone-muted text-white border-moonstone-border focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>
      
      {/* Events List */}
      <section className="py-10 px-4">
        <div className="container mx-auto">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event}
                  isRegistered={isRegisteredForEvent(event.id)}
                  onRegister={() => handleRegister(event.id)}
                  onUnregister={() => handleUnregister(event.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-white mb-2">No events found</h3>
              <p className="text-gray-400">
                {searchTerm 
                  ? `No events match "${searchTerm}". Try a different search term.` 
                  : "There are currently no events scheduled. Check back soon!"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
