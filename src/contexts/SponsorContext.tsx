
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  description: string;
  level: "platinum" | "gold" | "silver" | "bronze";
  website?: string;
}

interface SponsorContextType {
  sponsors: Sponsor[];
  addSponsor: (sponsor: Omit<Sponsor, "id">) => void;
  updateSponsor: (id: string, sponsor: Partial<Omit<Sponsor, "id">>) => void;
  deleteSponsor: (id: string) => void;
}

const SponsorContext = createContext<SponsorContextType | undefined>(undefined);

export const useSponsors = () => {
  const context = useContext(SponsorContext);
  if (context === undefined) {
    throw new Error("useSponsors must be used within a SponsorProvider");
  }
  return context;
};

interface SponsorProviderProps {
  children: ReactNode;
}

// Sample sponsors data
const sampleSponsors: Sponsor[] = [
  {
    id: "sponsor1",
    name: "TechCorp",
    logo: "https://via.placeholder.com/150?text=TechCorp",
    description: "A leading technology company specializing in AI and machine learning.",
    level: "platinum",
    website: "https://example.com"
  },
  {
    id: "sponsor2",
    name: "InnovateTech",
    logo: "https://via.placeholder.com/150?text=InnovateTech",
    description: "Innovative solutions for tomorrow's challenges.",
    level: "gold",
    website: "https://example.com"
  },
  {
    id: "sponsor3",
    name: "FutureSystems",
    logo: "https://via.placeholder.com/150?text=FutureSystems",
    description: "Building the future of technology, today.",
    level: "silver",
    website: "https://example.com"
  }
];

export const SponsorProvider: React.FC<SponsorProviderProps> = ({ children }) => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  // Initialize with sample sponsors or load from localStorage
  useEffect(() => {
    const storedSponsors = localStorage.getItem("moonstone_sponsors");
    if (storedSponsors) {
      setSponsors(JSON.parse(storedSponsors));
    } else {
      setSponsors(sampleSponsors);
      localStorage.setItem("moonstone_sponsors", JSON.stringify(sampleSponsors));
    }
  }, []);

  // Helper to update localStorage
  const updateStorage = (updatedSponsors: Sponsor[]) => {
    localStorage.setItem("moonstone_sponsors", JSON.stringify(updatedSponsors));
    setSponsors(updatedSponsors);
  };

  const addSponsor = (sponsor: Omit<Sponsor, "id">) => {
    const newSponsor: Sponsor = {
      ...sponsor,
      id: `sponsor_${Date.now()}`
    };
    
    const updatedSponsors = [...sponsors, newSponsor];
    updateStorage(updatedSponsors);
  };

  const updateSponsor = (id: string, sponsorData: Partial<Omit<Sponsor, "id">>) => {
    const updatedSponsors = sponsors.map(sponsor => 
      sponsor.id === id ? { ...sponsor, ...sponsorData } : sponsor
    );
    updateStorage(updatedSponsors);
  };

  const deleteSponsor = (id: string) => {
    const updatedSponsors = sponsors.filter(sponsor => sponsor.id !== id);
    updateStorage(updatedSponsors);
  };

  const value = {
    sponsors,
    addSponsor,
    updateSponsor,
    deleteSponsor
  };

  return <SponsorContext.Provider value={value}>{children}</SponsorContext.Provider>;
};
