
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import Countdown from '../components/Countdown';
import EventCard from '../components/EventCard';

const Index = () => {
  const { user } = useAuth();
  const { events } = useEvents();
  
  // Target date for the main event (e.g., January 1st, 2025)
  const targetDate = new Date('2025-01-01T00:00:00');
  
  // Get the latest 3 events
  const latestEvents = events.slice(0, 3);
  
  return (
    <div className="animate-float-up">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
          <span className="block mb-2">MO
            <span className="inline-block relative">
              <img 
                src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb" 
                alt="Moon" 
                className="inline-block h-16 md:h-20 lg:h-24 w-16 md:w-20 lg:w-24 rounded-full object-cover align-middle"
              />
            </span>
            N</span>
          <span className="block">STONE<sub className="text-xl md:text-2xl lg:text-3xl">2k25</sub></span>
        </h1>
        
        <p className="text-gray-300 max-w-2xl mb-8 text-lg md:text-xl">
          Experience the future of technology and innovation at the most anticipated event of 2025.
        </p>
        
        <div className="mb-12">
          <Countdown targetDate={targetDate} />
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
            <Link to="/events">Explore Events</Link>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            <Link to="/sponsors">Visit Sponsor</Link>
          </Button>
        </div>
        
        <div className="text-gray-500 mt-8">
          *This is not the official website for Moonstone 2k25.
        </div>
      </section>
      
      {/* Events Preview Section */}
      <section className="py-16 px-4 bg-black/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Upcoming Events
          </h2>
          
          {latestEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 my-12">
              No events scheduled yet. Check back soon!
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-moonstone-muted to-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to join the biggest tech event of 2025?
          </h2>
          
          <p className="text-gray-300 mb-8 text-lg">
            {user 
              ? "Explore events and register to participate!" 
              : "Create an account to register for events and stay updated."}
          </p>
          
          <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
            {user ? (
              <Link to="/events">Browse Events</Link>
            ) : (
              <Link to="/register">Sign Up Now</Link>
            )}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
