
import React, { useState } from 'react';
import { useFaqs } from '../../contexts/FaqContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash, HelpCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const AdminFAQ = () => {
  const { faqs, addFaq, updateFaq, deleteFaq } = useFaqs();
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for the new/edit FAQ form
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentFaqId, setCurrentFaqId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General'
  });
  
  // Filter FAQs based on search
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Reset form for new FAQ
  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'General'
    });
    setIsEditMode(false);
    setCurrentFaqId(null);
  };
  
  // Open dialog for new FAQ
  const handleNewFaq = () => {
    resetForm();
    setIsDialogOpen(true);
  };
  
  // Open dialog for editing FAQ
  const handleEditFaq = (faq: any) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'General'
    });
    setCurrentFaqId(faq.id);
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
    
    if (isEditMode && currentFaqId) {
      updateFaq(currentFaqId, formData);
      toast.success('FAQ updated successfully');
    } else {
      addFaq(formData);
      toast.success('New FAQ added successfully');
    }
    
    setIsDialogOpen(false);
    resetForm();
  };
  
  // Handle FAQ deletion
  const handleDeleteFaq = (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ? This action cannot be undone.')) {
      deleteFaq(id);
      toast.success('FAQ deleted successfully');
    }
  };

  return (
    <div className="animate-float-up">
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-b from-moonstone-muted/50 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Manage FAQs</h1>
              <p className="text-gray-300">
                Create and organize frequently asked questions
              </p>
            </div>
            
            <Button onClick={handleNewFaq}>
              Add New FAQ
            </Button>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <Input
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md bg-moonstone-muted text-white border-moonstone-border"
          />
        </div>
        
        {/* FAQs List */}
        <div className="space-y-6">
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map(faq => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-moonstone-muted border border-moonstone-border rounded-lg overflow-hidden"
                >
                  <div className="flex items-center justify-between pr-4">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline flex-grow">
                      <div>
                        <div className="flex items-center">
                          <HelpCircle size={18} className="mr-2 text-blue-400" />
                          <span className="font-medium text-white">{faq.question}</span>
                        </div>
                        <div className="text-gray-400 text-sm mt-1">
                          Category: {faq.category || 'General'}
                        </div>
                      </div>
                    </AccordionTrigger>
                    
                    <div className="flex space-x-2 shrink-0">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditFaq(faq);
                        }}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="destructive" 
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFaq(faq.id);
                        }}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <AccordionContent className="px-6 py-4 text-gray-300 border-t border-moonstone-border">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12 bg-moonstone-muted rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">No FAQs found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm ? `No FAQs match "${searchTerm}"` : "There are no FAQs yet"}
              </p>
              <Button onClick={handleNewFaq}>
                Add First FAQ
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* FAQ Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-moonstone-muted text-white border-moonstone-border">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                placeholder="Enter question"
                className="bg-moonstone-accent text-white border-moonstone-border"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                name="answer"
                value={formData.answer}
                onChange={handleInputChange}
                placeholder="Enter answer"
                className="bg-moonstone-accent text-white border-moonstone-border h-32"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Enter category (e.g. General, Registration, etc.)"
                className="bg-moonstone-accent text-white border-moonstone-border"
              />
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
                {isEditMode ? 'Update FAQ' : 'Add FAQ'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFAQ;
