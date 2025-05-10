
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import Countdown from '../components/Countdown';
import EventCard from '../components/EventCard';
import { ArrowRight, Calendar, Clock, Users } from 'lucide-react';

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
      <section className="py-20 md:py-32 px-4 flex flex-col items-center justify-center text-center relative">
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent"></div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 relative">
          <span className="block mb-2">TIME
            <span className="inline-block relative mx-2">
              <div className="animate-pulse-glow rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" 
                  alt="Time" 
                  className="inline-block h-16 md:h-20 lg:h-24 w-16 md:w-20 lg:w-24 rounded-full object-cover align-middle hover:scale-110 transition-transform duration-500"
                />
              </div>
            </span>
            LAPSE</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">2K25</span>
        </h1>
        
        <p className="text-gray-300 max-w-2xl mb-8 text-lg md:text-xl relative z-10">
          Experience the future of technology and innovation at the most anticipated event of 2025.
          Journey through time with groundbreaking ideas and connections.
        </p>
        
        <div className="mb-12 relative z-10">
          <Countdown targetDate={targetDate} />
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center relative z-10">
          <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 group">
            <Link to="/events">
              Explore Events
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            <Link to="/sponsors">Visit Sponsors</Link>
          </Button>
        </div>
        
        <div className="text-gray-500 mt-8 relative z-10">
          Transform your perception of time at Timelapse 2k25.
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-black/70">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-lg hover-card text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">{events.length}+</div>
              <div className="text-white text-sm">Upcoming Events</div>
            </div>
            
            <div className="glass-card p-6 rounded-lg hover-card text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-white text-sm">Speakers</div>
            </div>
            
            <div className="glass-card p-6 rounded-lg hover-card text-center">
              <div className="text-4xl font-bold text-indigo-400 mb-2">10+</div>
              <div className="text-white text-sm">Workshops</div>
            </div>
            
            <div className="glass-card p-6 rounded-lg hover-card text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">5000+</div>
              <div className="text-white text-sm">Attendees Expected</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Events Preview Section */}
      <section className="py-16 px-4 bg-black/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Upcoming Events</span>
            </h2>
            <Link to="/events" className="text-blue-400 hover:text-blue-300 flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {latestEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestEvents.map((event) => (
                <div key={event.id} className="group">
                  <EventCard 
                    key={event.id} 
                    event={event}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 my-12 glass-card p-12 rounded-lg animate-pulse-glow">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <p className="text-xl">No events scheduled yet.</p>
              <p className="mt-2">Check back soon or sign up for notifications!</p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black group">
              <Link to="/events">
                View All Events
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Why Attend Timelapse 2k25?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="glass-card p-6 rounded-lg hover-card">
              <div className="bg-blue-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Networking</h3>
              <p className="text-gray-400">Connect with industry professionals, like-minded peers, and potential collaborators.</p>
            </div>
            
            <div className="glass-card p-6 rounded-lg hover-card">
              <div className="bg-purple-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Workshops</h3>
              <p className="text-gray-400">Participate in hands-on workshops led by experts in the latest technologies.</p>
            </div>
            
            <div className="glass-card p-6 rounded-lg hover-card">
              <div className="bg-indigo-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
              <p className="text-gray-400">Discover cutting-edge technologies and ideas that will shape the future.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900/30 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500673922987-e212871fec22')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to experience the future at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Timelapse 2k25</span>?
          </h2>
          
          <p className="text-gray-300 mb-8 text-lg">
            {user 
              ? "Explore events and register to participate in the most anticipated tech event of 2025!" 
              : "Create an account to register for events and stay updated with the latest announcements."}
          </p>
          
          <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 group">
            {user ? (
              <Link to="/events">
                Browse Events
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link to="/register">
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
