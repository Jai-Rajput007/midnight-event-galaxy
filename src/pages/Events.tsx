
import React, { useState, useEffect } from 'react';
import { useEvents } from '../contexts/EventContext';
import { useAuth } from '../contexts/AuthContext';
import EventCard from '../components/EventCard';
import { Input } from '@/components/ui/input';
import { Search, Calendar, Filter, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Card,
  CardContent
} from '@/components/ui/card';

const Events = () => {
  const { events, registerForEvent, unregisterFromEvent } = useEvents();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [filterType, setFilterType] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter events based on search term and filter type
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    
    // Add more filter options based on event properties
    if (filterType === 'upcoming') {
      return matchesSearch && new Date(event.date) > new Date();
    }
    
    if (filterType === 'past') {
      return matchesSearch && new Date(event.date) < new Date();
    }
    
    if (filterType === 'registered' && user) {
      return matchesSearch && event.registrations.includes(user.id);
    }
    
    return matchesSearch;
  });
  
  // Sort events based on the selected option
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    
    if (sortOption === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    
    if (sortOption === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    
    return 0;
  });
  
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
  
  // Handle filter toggle
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="animate-float-up">
      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500673922987-e212871fec22')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Events</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover and register for our upcoming tech and innovation events. Join us on a journey through time.
          </p>
        </div>
      </section>
      
      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-black/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search events..."
                className="pl-10 bg-black/30 text-white border-gray-700 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Toggle Button */}
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={toggleFilter}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          
          {/* Expanded Filter Options */}
          {isFilterOpen && (
            <Card className="mt-4 glass-card animate-float-up">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Event Type</label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="bg-black/30 border-gray-700">
                        <SelectValue placeholder="All Events" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Event Type</SelectLabel>
                          <SelectItem value="all">All Events</SelectItem>
                          <SelectItem value="upcoming">Upcoming Events</SelectItem>
                          <SelectItem value="past">Past Events</SelectItem>
                          {user && <SelectItem value="registered">My Registered Events</SelectItem>}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Sort By</label>
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="bg-black/30 border-gray-700">
                        <SelectValue placeholder="Newest First" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sort Options</SelectLabel>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="alphabetical">Alphabetical</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
      
      {/* Events List */}
      <section className="py-10 px-4">
        <div className="container mx-auto">
          {sortedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedEvents.map((event) => (
                <div key={event.id} className="group hover:transform hover:scale-105 transition-transform duration-300">
                  <EventCard 
                    event={event}
                    isRegistered={isRegisteredForEvent(event.id)}
                    onRegister={() => handleRegister(event.id)}
                    onUnregister={() => handleUnregister(event.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass-card rounded-lg">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-2xl font-semibold text-white mb-2">No events found</h3>
              <p className="text-gray-400">
                {searchTerm 
                  ? `No events match "${searchTerm}". Try a different search term or filter.` 
                  : "There are currently no events scheduled. Check back soon!"}
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      {user && user.role === 'admin' && (
        <section className="py-16 px-4 bg-gradient-to-b from-blue-900/20 to-transparent">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              Admin Actions
            </h2>
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 group">
              <Link to="/admin/events">
                Manage Events
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

import { Link } from 'react-router-dom';

export default Events;
