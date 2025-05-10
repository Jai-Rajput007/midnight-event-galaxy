
import React, { useState } from 'react';
import { useSponsors } from '../../contexts/SponsorContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Trash, Award, Globe } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const AdminSponsors = () => {
  const { sponsors, addSponsor, updateSponsor, deleteSponsor } = useSponsors();
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for the new/edit sponsor form
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSponsorId, setCurrentSponsorId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    level: 'bronze' as 'platinum' | 'gold' | 'silver' | 'bronze',
    website: ''
  });
  
  // Filter sponsors based on search
  const filteredSponsors = sponsors.filter(sponsor => 
    sponsor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Reset form for new sponsor
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      logo: '',
      level: 'bronze',
      website: ''
    });
    setIsEditMode(false);
    setCurrentSponsorId(null);
  };
  
  // Open dialog for new sponsor
  const handleNewSponsor = () => {
    resetForm();
    setIsDialogOpen(true);
  };
  
  // Open dialog for editing sponsor
  const handleEditSponsor = (sponsor: any) => {
    setFormData({
      name: sponsor.name,
      description: sponsor.description,
      logo: sponsor.logo,
      level: sponsor.level,
      website: sponsor.website || ''
    });
    setCurrentSponsorId(sponsor.id);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select change
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      level: value as 'platinum' | 'gold' | 'silver' | 'bronze'
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && currentSponsorId) {
      updateSponsor(currentSponsorId, formData);
      toast.success('Sponsor updated successfully');
    } else {
      addSponsor(formData);
      toast.success('New sponsor added successfully');
    }
    
    setIsDialogOpen(false);
    resetForm();
  };
  
  // Handle sponsor deletion
  const handleDeleteSponsor = (id: string) => {
    if (confirm('Are you sure you want to delete this sponsor? This action cannot be undone.')) {
      deleteSponsor(id);
      toast.success('Sponsor deleted successfully');
    }
  };
  
  // Get level badge class
  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'platinum':
        return 'bg-gray-200 text-black';
      case 'gold':
        return 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/50';
      case 'silver':
        return 'bg-gray-400/20 text-gray-300 border border-gray-400/50';
      case 'bronze':
        return 'bg-amber-700/20 text-amber-200 border border-amber-700/50';
      default:
        return 'bg-gray-700 text-white';
    }
  };

  return (
    <div className="animate-float-up">
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-b from-moonstone-muted/50 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Manage Sponsors</h1>
              <p className="text-gray-300">
                Add, edit, and organize sponsors for Moonstone 2k25
              </p>
            </div>
            
            <Button onClick={handleNewSponsor}>
              Add New Sponsor
            </Button>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <Input
            placeholder="Search sponsors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md bg-moonstone-muted text-white border-moonstone-border"
          />
        </div>
        
        {/* Sponsors List */}
        <div className="space-y-6">
          {filteredSponsors.length > 0 ? (
            filteredSponsors.map(sponsor => (
              <div 
                key={sponsor.id} 
                className="bg-moonstone-muted rounded-lg overflow-hidden border border-moonstone-border hover:border-blue-500/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-40 flex items-center justify-center bg-white p-4">
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <div className="flex flex-wrap justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{sponsor.name}</h3>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${getLevelBadgeClass(sponsor.level)}`}>
                          {sponsor.level.charAt(0).toUpperCase() + sponsor.level.slice(1)} Sponsor
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8"
                          onClick={() => handleEditSponsor(sponsor)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="destructive" 
                          className="h-8 w-8"
                          onClick={() => handleDeleteSponsor(sponsor.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 mb-4">{sponsor.description}</p>
                    
                    {sponsor.website && (
                      <div className="flex items-center text-blue-400 hover:text-blue-300">
                        <Globe size={16} className="mr-2" />
                        <a 
                          href={sponsor.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {sponsor.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-moonstone-muted rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">No sponsors found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm ? `No sponsors match "${searchTerm}"` : "There are no sponsors yet"}
              </p>
              <Button onClick={handleNewSponsor}>
                Add First Sponsor
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Sponsor Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-moonstone-muted text-white border-moonstone-border">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Sponsor' : 'Add New Sponsor'}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Sponsor Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter sponsor name"
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
                placeholder="Enter sponsor description"
                className="bg-moonstone-accent text-white border-moonstone-border"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
                placeholder="Enter logo URL"
                className="bg-moonstone-accent text-white border-moonstone-border"
                required
              />
              <p className="text-sm text-gray-400">
                Use an image URL or placeholder (e.g., https://via.placeholder.com/150?text=CompanyName)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="level">Sponsorship Level</Label>
              <Select 
                value={formData.level}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="bg-moonstone-accent text-white border-moonstone-border">
                  <SelectValue placeholder="Select sponsor level" />
                </SelectTrigger>
                <SelectContent className="bg-moonstone-accent text-white border-moonstone-border">
                  <SelectItem value="platinum">Platinum</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="bronze">Bronze</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website URL (Optional)</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Enter website URL"
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
                {isEditMode ? 'Update Sponsor' : 'Add Sponsor'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSponsors;
