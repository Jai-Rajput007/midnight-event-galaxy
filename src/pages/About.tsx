
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Event Director',
      image: 'https://via.placeholder.com/150',
      bio: 'Alex has been organizing tech events for over a decade with a passion for creating memorable experiences.'
    },
    {
      name: 'Jamie Lee',
      role: 'Technical Lead',
      image: 'https://via.placeholder.com/150',
      bio: 'Jamie oversees all technical aspects of Moonstone events and has a background in software engineering.'
    },
    {
      name: 'Sam Rodriguez',
      role: 'Sponsor Relations',
      image: 'https://via.placeholder.com/150',
      bio: 'Sam builds and maintains relationships with our incredible sponsors to create valuable partnerships.'
    },
    {
      name: 'Taylor Kim',
      role: 'Marketing Director',
      image: 'https://via.placeholder.com/150',
      bio: 'Taylor handles all communications and ensures our events reach the right audience.'
    }
  ];

  return (
    <div className="animate-float-up">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Moonstone 2k25</h1>
          <p className="text-xl text-gray-300 mb-8">
            Exploring innovation and technology through unforgettable experiences.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-black/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
                alt="Moonstone Mission" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                Moonstone 2k25 was created with a simple but powerful mission: to bring together students, industry professionals, and technology enthusiasts in an environment that fosters innovation, learning, and collaboration.
              </p>
              <p className="text-gray-300 mb-6">
                We believe that by creating spaces where ideas can be shared freely, we can inspire the next generation of tech leaders and innovators to reach for the stars.
              </p>
              <Button asChild className="bg-white text-black hover:bg-gray-200">
                <Link to="/events">Explore Our Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Journey</h2>
          <div className="space-y-12">
            <div className="bg-moonstone-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">2023: The Beginning</h3>
              <p className="text-gray-300">
                What started as a small gathering of tech enthusiasts in a university lecture hall has grown into one of the most anticipated tech events of the year. Moonstone began with the simple idea that technology should be accessible and exciting for everyone.
              </p>
            </div>
            
            <div className="bg-moonstone-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">2024: Growth and Innovation</h3>
              <p className="text-gray-300">
                By our second year, attendance had tripled and we expanded to include workshops, hackathons, and networking events. Industry partnerships began to form, creating new opportunities for attendees.
              </p>
            </div>
            
            <div className="bg-moonstone-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">2025: Reaching for the Stars</h3>
              <p className="text-gray-300">
                Moonstone 2k25 represents our biggest vision yet. With global speakers, cutting-edge demonstrations, and a community of thousands, we're taking technology events to new heights while staying true to our core mission of accessibility and inspiration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-black/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-moonstone-muted p-6 rounded-lg flex flex-col items-center text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mb-4 object-cover" 
                />
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 mb-3">{member.role}</p>
                <p className="text-gray-300">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Us on This Journey</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Whether you're a student, professional, or tech enthusiast, there's a place for you at Moonstone 2k25.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-white text-black hover:bg-gray-200">
              <Link to="/events">Explore Events</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Link to="/sponsors">Become a Sponsor</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
