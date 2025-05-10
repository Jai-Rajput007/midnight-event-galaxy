
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Starfield from './Starfield';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Starfield />
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
