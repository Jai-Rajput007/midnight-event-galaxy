
import React, { useState } from 'react';
import { useFaqs } from '../contexts/FaqContext';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

const FAQ = () => {
  const { faqs } = useFaqs();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(
    new Set(faqs.map(faq => faq.category || 'General'))
  );
  
  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !activeCategory || faq.category === activeCategory || 
      (!faq.category && activeCategory === 'General');
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-float-up">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 mb-8">
            Find answers to common questions about Moonstone 2k25.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-12">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search questions..."
              className="pl-10 bg-moonstone-muted text-white border-moonstone-border focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category Filters */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <button
                className={`px-4 py-2 rounded-full text-sm ${
                  !activeCategory 
                    ? 'bg-white text-black' 
                    : 'bg-moonstone-muted text-white hover:bg-moonstone-accent'
                } transition-colors`}
                onClick={() => setActiveCategory(null)}
              >
                All
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeCategory === category 
                      ? 'bg-white text-black' 
                      : 'bg-moonstone-muted text-white hover:bg-moonstone-accent'
                  } transition-colors`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* FAQ Accordion */}
      <section className="py-10 px-4 mb-20">
        <div className="container mx-auto max-w-3xl">
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="border border-moonstone-accent rounded-lg overflow-hidden bg-moonstone-muted"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-moonstone-accent/20">
                    <span className="text-white font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-white mb-2">No matching questions found</h3>
              <p className="text-gray-400">
                {searchTerm 
                  ? `No questions match "${searchTerm}". Try a different search term.` 
                  : "There are currently no FAQs in this category."}
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 px-4 bg-moonstone-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Still have questions?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            If you couldn't find the answer you were looking for, feel free to reach out to our team directly.
          </p>
          <a
            href="mailto:info@moonstone2k25.com"
            className="inline-block px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
