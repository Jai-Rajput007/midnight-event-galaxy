
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQContextType {
  faqs: FAQ[];
  addFaq: (faq: Omit<FAQ, "id">) => void;
  updateFaq: (id: string, faq: Partial<Omit<FAQ, "id">>) => void;
  deleteFaq: (id: string) => void;
}

const FAQContext = createContext<FAQContextType | undefined>(undefined);

export const useFaqs = () => {
  const context = useContext(FAQContext);
  if (context === undefined) {
    throw new Error("useFaqs must be used within a FAQProvider");
  }
  return context;
};

interface FAQProviderProps {
  children: ReactNode;
}

// Sample FAQs data
const sampleFaqs: FAQ[] = [
  {
    id: "faq1",
    question: "What is Moonstone 2k25?",
    answer: "Moonstone 2k25 is an event management platform for organizing and participating in various tech and cultural events.",
    category: "General"
  },
  {
    id: "faq2",
    question: "How do I register for events?",
    answer: "To register for events, create a student account, log in, browse available events, and click the 'Register' button for the events you're interested in.",
    category: "Registration"
  },
  {
    id: "faq3",
    question: "Are there any fees for participating in events?",
    answer: "Most events are free for students. Some specialized workshops or competitions may have a nominal fee, which will be clearly indicated on the event details page.",
    category: "Registration"
  },
  {
    id: "faq4",
    question: "How can I become a sponsor?",
    answer: "For sponsorship inquiries, please contact our team through the 'Become a Sponsor' form on the Sponsors page or email us at sponsors@moonstone2k25.com.",
    category: "Sponsorship"
  }
];

export const FAQProvider: React.FC<FAQProviderProps> = ({ children }) => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  // Initialize with sample FAQs or load from localStorage
  useEffect(() => {
    const storedFaqs = localStorage.getItem("moonstone_faqs");
    if (storedFaqs) {
      setFaqs(JSON.parse(storedFaqs));
    } else {
      setFaqs(sampleFaqs);
      localStorage.setItem("moonstone_faqs", JSON.stringify(sampleFaqs));
    }
  }, []);

  // Helper to update localStorage
  const updateStorage = (updatedFaqs: FAQ[]) => {
    localStorage.setItem("moonstone_faqs", JSON.stringify(updatedFaqs));
    setFaqs(updatedFaqs);
  };

  const addFaq = (faq: Omit<FAQ, "id">) => {
    const newFaq: FAQ = {
      ...faq,
      id: `faq_${Date.now()}`
    };
    
    const updatedFaqs = [...faqs, newFaq];
    updateStorage(updatedFaqs);
  };

  const updateFaq = (id: string, faqData: Partial<Omit<FAQ, "id">>) => {
    const updatedFaqs = faqs.map(faq => 
      faq.id === id ? { ...faq, ...faqData } : faq
    );
    updateStorage(updatedFaqs);
  };

  const deleteFaq = (id: string) => {
    const updatedFaqs = faqs.filter(faq => faq.id !== id);
    updateStorage(updatedFaqs);
  };

  const value = {
    faqs,
    addFaq,
    updateFaq,
    deleteFaq
  };

  return <FAQContext.Provider value={value}>{children}</FAQContext.Provider>;
};
