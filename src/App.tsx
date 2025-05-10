
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Providers
import { AuthProvider } from "./contexts/AuthContext";
import { EventProvider } from "./contexts/EventContext";
import { SponsorProvider } from "./contexts/SponsorContext";
import { FAQProvider } from "./contexts/FaqContext";

// Pages
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Sponsors from "./pages/Sponsors";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminSponsors from "./pages/admin/AdminSponsors";
import AdminFAQ from "./pages/admin/AdminFAQ";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <EventProvider>
        <SponsorProvider>
          <FAQProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:eventId" element={<EventDetail />} />
                    <Route path="/sponsors" element={<Sponsors />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Protected student routes */}
                    <Route 
                      path="/dashboard" 
                      element={
                        <ProtectedRoute requiredRole="student">
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Protected admin routes */}
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminPanel />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/events" 
                      element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminEvents />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/sponsors" 
                      element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminSponsors />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/faq" 
                      element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminFAQ />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Catch-all route */}
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </FAQProvider>
        </SponsorProvider>
      </EventProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
