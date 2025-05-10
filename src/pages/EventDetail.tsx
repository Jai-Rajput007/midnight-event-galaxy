
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ArrowLeft, Users, Share2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

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
  
  // Handle share event
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: `Check out this event: ${event?.title}`,
        url: window.location.href,
      })
      .then(() => toast.success('Event shared successfully'))
      .catch(() => toast.error('Error sharing event'));
    } else {
      // Fallback for browsers that don't support the Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Event link copied to clipboard');
    }
  };
  
  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-20 text-center glass-card rounded-lg animate-pulse-glow">
        <h2 className="text-2xl font-bold text-white mb-4">Event Not Found</h2>
        <p className="text-gray-400 mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Button asChild variant="outline" className="group">
          <Link to="/events">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Events
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-float-up">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover animate-shimmer"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="container mx-auto">
            <button 
              onClick={handleBack}
              className="flex items-center text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft size={18} className="mr-2" />
              <span>Back</span>
            </button>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 text-glow">{event.title}</h1>
            
            <div className="flex flex-wrap gap-4 md:gap-6">
              <div className="flex items-center text-gray-300 bg-black/40 px-3 py-1 rounded-full">
                <Calendar size={16} className="mr-2 text-blue-400" />
                <span>{formatDate(event.date)}</span>
              </div>
              
              <div className="flex items-center text-gray-300 bg-black/40 px-3 py-1 rounded-full">
                <Clock size={16} className="mr-2 text-blue-400" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center text-gray-300 bg-black/40 px-3 py-1 rounded-full">
                <MapPin size={16} className="mr-2 text-blue-400" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center text-gray-300 bg-black/40 px-3 py-1 rounded-full">
                <Users size={16} className="mr-2 text-blue-400" />
                <span>{event.registrations.length} registered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="glass-card overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="prose prose-invert max-w-none mb-8">
                  <h2 className="text-xl font-bold text-white mb-4">About This Event</h2>
                  <p className="text-gray-300 whitespace-pre-line">{event.description}</p>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-white mb-4">What to Expect</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      <span>Networking opportunities with industry professionals</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      <span>Hands-on workshops and interactive sessions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      <span>Latest innovations and technologies showcase</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      <span>Refreshments and event materials provided</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Action Sidebar */}
          <div>
            <Card className="glass-card overflow-hidden sticky top-20">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Registration</h3>
                
                {/* Registration Button */}
                {user ? (
                  isRegistered ? (
                    <Button 
                      onClick={handleUnregister}
                      variant="destructive"
                      size="lg"
                      className="w-full mb-4"
                    >
                      Cancel Registration
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleRegister}
                      size="lg"
                      className="w-full mb-4"
                    >
                      Register for Event
                    </Button>
                  )
                ) : (
                  <div className="space-y-4 mb-4">
                    <p className="text-gray-400">Please log in to register for this event.</p>
                    <Button asChild className="w-full">
                      <Link to="/login">Log In</Link>
                    </Button>
                  </div>
                )}
                
                {/* Share Button */}
                <Button 
                  variant="outline" 
                  className="w-full mb-4"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Event
                </Button>
                
                {/* Admin Edit Button */}
                {user && user.role === 'admin' && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <Link to={`/admin/events?edit=${event.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Event
                    </Link>
                  </Button>
                )}
                
                {/* Attendee Count */}
                <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-900/30">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Current Attendance</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-400 mr-2" />
                      <span className="text-white font-medium">{event.registrations.length} people registered</span>
                    </div>
                    {event.registrations.length > 0 && (
                      <div className="bg-blue-500 text-xs text-white px-2 py-1 rounded-full">
                        Active
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Event Date/Time */}
                <div className="mt-4 p-4 bg-purple-900/20 rounded-lg border border-purple-900/30">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">When</h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-purple-400 mr-2" />
                      <div>
                        <div className="text-white">{formatDate(event.date)}</div>
                        <div className="text-gray-400 text-sm">{event.time}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-purple-400 mr-2" />
                      <div>
                        <div className="text-white">{event.location}</div>
                        <div className="text-gray-400 text-sm">View on map</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                <div key={relatedEvent.id} className="glass-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 hover-card">
                  <Link to={`/events/${relatedEvent.id}`}>
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={relatedEvent.image} 
                        alt={relatedEvent.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center text-xs text-gray-400 mb-2">
                        <Calendar size={12} className="mr-1" />
                        {formatDate(relatedEvent.date)}
                      </div>
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
