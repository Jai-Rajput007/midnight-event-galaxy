
import React, { useState } from 'react';
import { useSponsors } from '../contexts/SponsorContext';
import SponsorCard from '../components/SponsorCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Search, Filter, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Sponsors = () => {
  const { sponsors } = useSponsors();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Group sponsors by level
  const platinumSponsors = sponsors.filter(s => s.level === 'platinum');
  const goldSponsors = sponsors.filter(s => s.level === 'gold');
  const silverSponsors = sponsors.filter(s => s.level === 'silver');
  const bronzeSponsors = sponsors.filter(s => s.level === 'bronze');

  // Filter sponsors based on search term
  const filterSponsors = (sponsorList) => {
    if (!searchTerm) return sponsorList;
    return sponsorList.filter(sponsor => 
      sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sponsor.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Stats for sponsors
  const sponsorStats = [
    { level: 'platinum', count: platinumSponsors.length, color: 'from-gray-200 to-white' },
    { level: 'gold', count: goldSponsors.length, color: 'from-yellow-300 to-yellow-500' },
    { level: 'silver', count: silverSponsors.length, color: 'from-gray-300 to-gray-400' },
    { level: 'bronze', count: bronzeSponsors.length, color: 'from-amber-600 to-amber-800' }
  ];
  
  return (
    <div className="animate-float-up pb-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500673922987-e212871fec22')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Partners</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            Timelapse 2k25 is made possible with the support of these visionary organizations.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-12">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search sponsors..."
              className="pl-10 bg-transparent border-gray-700 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Sponsor Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {sponsorStats.map((stat) => (
              <div key={stat.level} className="glass-card rounded-lg p-4 hover-card">
                <div className={`h-2 w-24 mx-auto rounded-full bg-gradient-to-r ${stat.color} mb-3`}></div>
                <h3 className="text-lg capitalize font-medium text-white mb-1">{stat.level}</h3>
                <p className="text-2xl font-bold text-gray-300">{stat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Tabs Section */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/50 border border-gray-800">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-900/30">All Sponsors</TabsTrigger>
              <TabsTrigger value="platinum" className="data-[state=active]:bg-blue-900/30">Platinum</TabsTrigger>
              <TabsTrigger value="gold" className="data-[state=active]:bg-blue-900/30">Gold</TabsTrigger>
              <TabsTrigger value="silver" className="data-[state=active]:bg-blue-900/30">Silver</TabsTrigger>
              <TabsTrigger value="bronze" className="data-[state=active]:bg-blue-900/30">Bronze</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            {/* Platinum Sponsors */}
            {filterSponsors(platinumSponsors).length > 0 && (
              <section className="mb-16">
                <div className="flex items-center mb-8">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-gray-200 to-white mr-3">
                    <Award className="h-5 w-5 text-gray-800" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Platinum Sponsors</h2>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-grow ml-4"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filterSponsors(platinumSponsors).map(sponsor => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} />
                  ))}
                </div>
              </section>
            )}
            
            {/* Gold Sponsors */}
            {filterSponsors(goldSponsors).length > 0 && (
              <section className="mb-16">
                <div className="flex items-center mb-8">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-yellow-300 to-yellow-500 mr-3">
                    <Award className="h-5 w-5 text-gray-800" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Gold Sponsors</h2>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-grow ml-4"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filterSponsors(goldSponsors).map(sponsor => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} />
                  ))}
                </div>
              </section>
            )}
            
            {/* Silver Sponsors */}
            {filterSponsors(silverSponsors).length > 0 && (
              <section className="mb-16">
                <div className="flex items-center mb-8">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-gray-300 to-gray-400 mr-3">
                    <Award className="h-5 w-5 text-gray-800" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Silver Sponsors</h2>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-grow ml-4"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filterSponsors(silverSponsors).map(sponsor => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} />
                  ))}
                </div>
              </section>
            )}
            
            {/* Bronze Sponsors */}
            {filterSponsors(bronzeSponsors).length > 0 && (
              <section className="mb-16">
                <div className="flex items-center mb-8">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-amber-600 to-amber-800 mr-3">
                    <Award className="h-5 w-5 text-gray-800" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Bronze Sponsors</h2>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-grow ml-4"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filterSponsors(bronzeSponsors).map(sponsor => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} />
                  ))}
                </div>
              </section>
            )}
          </TabsContent>

          <TabsContent value="platinum">
            {filterSponsors(platinumSponsors).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filterSponsors(platinumSponsors).map(sponsor => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass-card rounded-lg">
                <h3 className="text-2xl font-semibold text-white mb-2">No Platinum Sponsors Found</h3>
                <p className="text-gray-400">Check other categories or become our first platinum sponsor!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="gold">
            {filterSponsors(goldSponsors).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filterSponsors(goldSponsors).map(sponsor => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass-card rounded-lg">
                <h3 className="text-2xl font-semibold text-white mb-2">No Gold Sponsors Found</h3>
                <p className="text-gray-400">Check other categories or become our first gold sponsor!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="silver">
            {filterSponsors(silverSponsors).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filterSponsors(silverSponsors).map(sponsor => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass-card rounded-lg">
                <h3 className="text-2xl font-semibold text-white mb-2">No Silver Sponsors Found</h3>
                <p className="text-gray-400">Check other categories or become our first silver sponsor!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="bronze">
            {filterSponsors(bronzeSponsors).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filterSponsors(bronzeSponsors).map(sponsor => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass-card rounded-lg">
                <h3 className="text-2xl font-semibold text-white mb-2">No Bronze Sponsors Found</h3>
                <p className="text-gray-400">Check other categories or become our first bronze sponsor!</p>
              </div>
            )}
          </TabsContent>

          {/* No sponsors message */}
          {sponsors.length === 0 && (
            <div className="text-center py-12 glass-card rounded-lg animate-pulse-glow">
              <h3 className="text-2xl font-semibold text-white mb-4">Become Our First Sponsor</h3>
              <p className="text-gray-400 mb-8">
                We're currently looking for sponsors to support Timelapse 2k25. 
                Join us in creating an unforgettable event!
              </p>
            </div>
          )}
        </Tabs>
      </div>
      
      {/* Become a Sponsor Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-900/20 to-black/80 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5')] bg-cover bg-fixed opacity-5"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Sponsor</span>
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Partner with Timelapse 2k25 to showcase your brand to tech enthusiasts, students, and industry professionals. We offer various sponsorship packages to meet your goals.
          </p>
          <div className="max-w-md mx-auto">
            <Button size="lg" className="w-full bg-white text-black hover:bg-gray-200 group">
              Get Sponsorship Details
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <p className="text-gray-400 mt-4">
            For inquiries, contact sponsors@timelapse2k25.com
          </p>
        </div>
      </section>
      
      {/* Sponsorship Packages */}
      <section className="py-16 px-4 bg-black/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Sponsorship Packages</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Bronze Package */}
            <Card className="glass-card border-amber-700/50 hover-card overflow-hidden relative">
              <div className="h-2 bg-gradient-to-r from-amber-600 to-amber-800"></div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-white mb-1">Bronze</h3>
                <div className="text-3xl font-bold text-amber-500 mb-4">$1,000</div>
                <ul className="space-y-2 text-sm text-gray-300 mb-6">
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-amber-600 rounded-full mr-2"></div>
                    Logo on website
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-amber-600 rounded-full mr-2"></div>
                    Social media mention
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-amber-600 rounded-full mr-2"></div>
                    1 complimentary pass
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-amber-700 text-amber-500 hover:bg-amber-900/20">Learn More</Button>
              </CardContent>
            </Card>
            
            {/* Silver Package */}
            <Card className="glass-card border-gray-400/50 hover-card overflow-hidden relative">
              <div className="h-2 bg-gradient-to-r from-gray-300 to-gray-400"></div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-white mb-1">Silver</h3>
                <div className="text-3xl font-bold text-gray-300 mb-4">$3,000</div>
                <ul className="space-y-2 text-sm text-gray-300 mb-6">
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-gray-400 rounded-full mr-2"></div>
                    All Bronze benefits
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-gray-400 rounded-full mr-2"></div>
                    Logo on event banner
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-gray-400 rounded-full mr-2"></div>
                    3 complimentary passes
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-gray-400 text-gray-300 hover:bg-gray-500/20">Learn More</Button>
              </CardContent>
            </Card>
            
            {/* Gold Package */}
            <Card className="glass-card border-yellow-500/50 hover-card overflow-hidden relative">
              <div className="h-2 bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-white mb-1">Gold</h3>
                <div className="text-3xl font-bold text-yellow-500 mb-4">$7,500</div>
                <ul className="space-y-2 text-sm text-gray-300 mb-6">
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                    All Silver benefits
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                    Exhibition booth
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                    Workshop opportunity
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-900/20">Learn More</Button>
              </CardContent>
            </Card>
            
            {/* Platinum Package */}
            <Card className="glass-card border-white/50 hover-card overflow-hidden relative">
              <div className="h-2 bg-gradient-to-r from-gray-200 to-white"></div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-white mb-1">Platinum</h3>
                <div className="text-3xl font-bold text-white mb-4">$15,000</div>
                <ul className="space-y-2 text-sm text-gray-300 mb-6">
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-white rounded-full mr-2"></div>
                    All Gold benefits
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-white rounded-full mr-2"></div>
                    Keynote speaking slot
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-white rounded-full mr-2"></div>
                    Premium branding
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-white text-white hover:bg-white/20">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;
