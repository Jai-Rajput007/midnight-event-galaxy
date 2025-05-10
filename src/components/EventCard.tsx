
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Event } from '@/contexts/EventContext';

interface EventCardProps {
  event: Event;
  isRegistered?: boolean;
  onRegister?: () => void;
  onUnregister?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  isRegistered,
  onRegister, 
  onUnregister 
}) => {
  const { id, title, description, date, time, location, image } = event;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-moonstone-muted rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        
        <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-400">
            <Calendar size={16} className="mr-2" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-gray-400">
            <Clock size={16} className="mr-2" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center text-gray-400">
            <MapPin size={16} className="mr-2" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button asChild variant="outline" className="flex-1">
            <Link to={`/events/${id}`}>View Details</Link>
          </Button>
          
          {onRegister && !isRegistered && (
            <Button onClick={onRegister} className="flex-1">
              Register
            </Button>
          )}
          
          {onUnregister && isRegistered && (
            <Button 
              onClick={onUnregister} 
              variant="destructive"
              className="flex-1"
            >
              Unregister
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
