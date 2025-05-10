
import React, { useState } from 'react';
import { useEvents } from '../../contexts/EventContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin, Users, Edit, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const AdminEvents = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for the new/edit event form
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: ''
  });
  
  // Filter events based on search
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Reset form for new event
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      image: ''
    });
    setIsEditMode(false);
    setCurrentEventId(null);
  };
  
  // Open dialog for new event
  const handleNewEvent = () => {
    resetForm();
    setIsDialogOpen(true);
  };
  
  // Open dialog for editing event
  const handleEditEvent = (event: any) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image
    });
    setCurrentEventId(event.id);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && currentEventId) {
      updateEvent(currentEventId, formData);
      toast.success('Event updated successfully');
    } else {
      addEvent(formData);
      toast.success('New event added successfully');
    }
    
    setIsDialogOpen(false);
    resetForm();
  };
  
  // Handle event deletion
  const handleDeleteEvent = (id: string) => {
    if (confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      deleteEvent(id);
      toast.success('Event deleted successfully');
    }
  };

  return (
    <div className="animate-float-up">
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-b from-moonstone-muted/50 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Manage Events</h1>
              <p className="text-gray-300">
                Create, edit, and delete events for Moonstone 2k25
              </p>
            </div>
            
            <Button onClick={handleNewEvent}>
              Create New Event
            </Button>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md bg-moonstone-muted text-white border-moonstone-border"
          />
        </div>
        
        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div 
                key={event.id} 
                className="bg-moonstone-muted rounded-lg overflow-hidden border border-moonstone-border hover:border-blue-500/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-40 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <div className="flex flex-wrap justify-between items-start">
                      <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                      <div className="flex space-x-2">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8"
                          onClick={() => handleEditEvent(event)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="destructive" 
                          className="h-8 w-8"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                      <div className="flex items-center text-gray-300">
                        <Calendar size={16} className="mr-2 text-blue-400" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-300">
                        <Clock size={16} className="mr-2 text-blue-400" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-300">
                        <MapPin size={16} className="mr-2 text-blue-400" />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-300">
                        <Users size={16} className="mr-2 text-blue-400" />
                        <span>{event.registrations.length} registrations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-moonstone-muted rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm ? `No events match "${searchTerm}"` : "There are no events yet"}
              </p>
              <Button onClick={handleNewEvent}>
                Create First Event
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Event Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-moonstone-muted text-white border-moonstone-border max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Event' : 'Create New Event'}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                className="bg-moonstone-accent text-white border-moonstone-border"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter event description"
                className="bg-moonstone-accent text-white border-moonstone-border h-32"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="bg-moonstone-accent text-white border-moonstone-border"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="bg-moonstone-accent text-white border-moonstone-border"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter event location"
                className="bg-moonstone-accent text-white border-moonstone-border"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                className="bg-moonstone-accent text-white border-moonstone-border"
                required
              />
              <p className="text-sm text-gray-400">
                Suggested: Use a URL from unsplash.com or another image hosting service
              </p>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? 'Update Event' : 'Create Event'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEvents;
