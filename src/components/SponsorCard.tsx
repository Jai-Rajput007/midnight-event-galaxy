
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Sponsor } from '@/contexts/SponsorContext';

interface SponsorCardProps {
  sponsor: Sponsor;
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor }) => {
  const { name, logo, description, level, website } = sponsor;
  
  // Define styling based on sponsor level
  const getLevelStyles = () => {
    switch (level) {
      case 'platinum':
        return 'bg-gradient-to-br from-gray-100 to-gray-300 text-black';
      case 'gold':
        return 'bg-gradient-to-br from-yellow-500/20 to-amber-700/20 border-yellow-500/50';
      case 'silver':
        return 'bg-gradient-to-br from-gray-400/20 to-gray-600/20 border-gray-400/50';
      case 'bronze':
        return 'bg-gradient-to-br from-amber-700/20 to-amber-900/20 border-amber-700/50';
      default:
        return 'bg-gradient-to-br from-gray-800/50 to-black/50';
    }
  };
  
  return (
    <div className={`group rounded-lg overflow-hidden shadow-lg border border-opacity-20 ${getLevelStyles()} transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]`}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="w-20 h-20 bg-white rounded-md flex items-center justify-center p-2 mb-4">
            <img 
              src={logo} 
              alt={name} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full uppercase">
            {level}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        
        <p className="text-gray-400 mb-4 text-sm">{description}</p>
        
        {website && (
          <a 
            href={website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            Visit Website <ExternalLink size={14} className="ml-1" />
          </a>
        )}
      </div>
    </div>
  );
};

export default SponsorCard;
