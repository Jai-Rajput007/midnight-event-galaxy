
import React from 'react';
import { useSponsors } from '../contexts/SponsorContext';
import SponsorCard from '../components/SponsorCard';
import { Button } from '@/components/ui/button';

const Sponsors = () => {
  const { sponsors } = useSponsors();
  
  // Group sponsors by level
  const platinumSponsors = sponsors.filter(s => s.level === 'platinum');
  const goldSponsors = sponsors.filter(s => s.level === 'gold');
  const silverSponsors = sponsors.filter(s => s.level === 'silver');
  const bronzeSponsors = sponsors.filter(s => s.level === 'bronze');

  return (
    <div className="animate-float-up">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Sponsors</h1>
          <p className="text-xl text-gray-300 mb-8">
            Moonstone 2k25 is made possible with the support of these amazing organizations.
          </p>
        </div>
      </section>
      
      {/* Sponsors Sections */}
      <div className="container mx-auto px-4 py-8">
        {/* Platinum Sponsors */}
        {platinumSponsors.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Platinum Sponsors</h2>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-grow ml-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platinumSponsors.map(sponsor => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </section>
        )}
        
        {/* Gold Sponsors */}
        {goldSponsors.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Gold Sponsors</h2>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-grow ml-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {goldSponsors.map(sponsor => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </section>
        )}
        
        {/* Silver Sponsors */}
        {silverSponsors.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Silver Sponsors</h2>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-grow ml-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {silverSponsors.map(sponsor => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </section>
        )}
        
        {/* Bronze Sponsors */}
        {bronzeSponsors.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Bronze Sponsors</h2>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-grow ml-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bronzeSponsors.map(sponsor => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </section>
        )}
        
        {/* No sponsors message */}
        {sponsors.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-white mb-4">Become Our First Sponsor</h3>
            <p className="text-gray-400 mb-8">
              We're currently looking for sponsors to support Moonstone 2k25. 
              Join us in creating an unforgettable event!
            </p>
          </div>
        )}
      </div>
      
      {/* Become a Sponsor Section */}
      <section className="py-20 px-4 bg-moonstone-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Become a Sponsor</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Partner with Moonstone 2k25 to showcase your brand to tech enthusiasts, students, and industry professionals. We offer various sponsorship packages to meet your goals.
          </p>
          <div className="max-w-md mx-auto">
            <Button size="lg" className="w-full bg-white text-black hover:bg-gray-200">
              Get Sponsorship Details
            </Button>
          </div>
          <p className="text-gray-400 mt-4">
            For inquiries, contact sponsors@moonstone2k25.com
          </p>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;
