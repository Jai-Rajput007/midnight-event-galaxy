
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Starfield from './Starfield';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Starfield />
      <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-gradient-radial from-indigo-900/20 via-transparent to-transparent pointer-events-none"></div>
      <Navbar />
      <main className="flex-grow pt-16 animate-fade-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
