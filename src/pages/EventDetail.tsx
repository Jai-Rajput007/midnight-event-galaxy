
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ArrowLeft, Users } from 'lucide-react';
import { toast } from 'sonner';

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { events, registerForEvent, unregisterFromEvent } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const event = events.find(e => e.id === eventId);
  
  // Check if user is registered for this event
  const isRegistered = user && event ? event.registrations.includes(user.id) : false;
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Handle event registration
  const handleRegister = () => {
    if (!user) {
      toast.error('Please log in to register for events');
      return;
    }
    
    if (!event) return;
    
    registerForEvent(event.id, user.id);
    toast.success('Successfully registered for the event');
  };
  
  // Handle event unregistration
  const handleUnregister = () => {
    if (!user || !event) return;
    
    unregisterFromEvent(event.id, user.id);
    toast.success('Successfully unregistered from the event');
  };
  
  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Event Not Found</h2>
        <p className="text-gray-400 mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Button asChild variant="outline">
          <Link to="/events">Back to Events</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-float-up">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={18} className="mr-2" />
          <span>Back</span>
        </button>
        
        {/* Event Details */}
        <div className="bg-moonstone-muted rounded-lg p-6 md:p-8 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{event.title}</h1>
          
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center text-gray-300">
              <Calendar size={18} className="mr-2 text-blue-400" />
              <span>{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-center text-gray-300">
              <Clock size={18} className="mr-2 text-blue-400" />
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center text-gray-300">
              <MapPin size={18} className="mr-2 text-blue-400" />
              <span>{event.location}</span>
            </div>
            
            <div className="flex items-center text-gray-300">
              <Users size={18} className="mr-2 text-blue-400" />
              <span>{event.registrations.length} registered</span>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-gray-300 whitespace-pre-line">{event.description}</p>
          </div>
          
          {/* Registration Button */}
          <div className="mt-8">
            {user ? (
              isRegistered ? (
                <Button 
                  onClick={handleUnregister}
                  variant="destructive"
                  size="lg"
                >
                  Cancel Registration
                </Button>
              ) : (
                <Button 
                  onClick={handleRegister}
                  size="lg"
                >
                  Register for Event
                </Button>
              )
            ) : (
              <div className="space-y-4">
                <p className="text-gray-400">Please log in to register for this event.</p>
                <Button asChild>
                  <Link to="/login">Log In</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Events */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">You Might Also Be Interested In</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events
              .filter(e => e.id !== event.id)
              .slice(0, 3)
              .map(relatedEvent => (
                <div key={relatedEvent.id} className="bg-moonstone-muted rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <Link to={`/events/${relatedEvent.id}`}>
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={relatedEvent.image} 
                        alt={relatedEvent.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">{relatedEvent.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{relatedEvent.description}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
