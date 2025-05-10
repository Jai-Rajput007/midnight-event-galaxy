
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  registrations: string[];
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, "id" | "registrations">) => void;
  updateEvent: (id: string, event: Partial<Omit<Event, "id">>) => void;
  deleteEvent: (id: string) => void;
  registerForEvent: (eventId: string, userId: string) => void;
  unregisterFromEvent: (eventId: string, userId: string) => void;
  getUserEvents: (userId: string) => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};

interface EventProviderProps {
  children: ReactNode;
}

// Sample events data
const sampleEvents: Event[] = [
  {
    id: "event1",
    title: "Moonstone Launch Party",
    description: "Join us for the official launch of Moonstone 2k25!",
    date: "2025-01-15",
    time: "18:00",
    location: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    registrations: []
  },
  {
    id: "event2",
    title: "Tech Workshop",
    description: "Learn about the latest technologies in this hands-on workshop.",
    date: "2025-02-10",
    time: "10:00",
    location: "Tech Hub",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    registrations: []
  },
  {
    id: "event3",
    title: "Networking Night",
    description: "Connect with industry professionals and fellow students.",
    date: "2025-03-05",
    time: "19:00",
    location: "Central Hall",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    registrations: []
  }
];

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  // Initialize with sample events or load from localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem("moonstone_events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(sampleEvents);
      localStorage.setItem("moonstone_events", JSON.stringify(sampleEvents));
    }
  }, []);

  // Helper to update localStorage
  const updateStorage = (updatedEvents: Event[]) => {
    localStorage.setItem("moonstone_events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const addEvent = (event: Omit<Event, "id" | "registrations">) => {
    const newEvent: Event = {
      ...event,
      id: `event_${Date.now()}`,
      registrations: []
    };
    
    const updatedEvents = [...events, newEvent];
    updateStorage(updatedEvents);
  };

  const updateEvent = (id: string, eventData: Partial<Omit<Event, "id">>) => {
    const updatedEvents = events.map(event => 
      event.id === id ? { ...event, ...eventData } : event
    );
    updateStorage(updatedEvents);
  };

  const deleteEvent = (id: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    updateStorage(updatedEvents);
  };

  const registerForEvent = (eventId: string, userId: string) => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId && !event.registrations.includes(userId)) {
        return {
          ...event,
          registrations: [...event.registrations, userId]
        };
      }
      return event;
    });
    updateStorage(updatedEvents);
  };

  const unregisterFromEvent = (eventId: string, userId: string) => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          registrations: event.registrations.filter(id => id !== userId)
        };
      }
      return event;
    });
    updateStorage(updatedEvents);
  };

  const getUserEvents = (userId: string) => {
    return events.filter(event => event.registrations.includes(userId));
  };

  const value = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    unregisterFromEvent,
    getUserEvents
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
