
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await login(email, password, role);
      
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
      
      toast.success(`Welcome back! You're now logged in as ${role}.`);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md bg-moonstone-muted border-moonstone-border">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Login</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="bg-red-900/40 border border-red-500 text-red-200 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-moonstone-accent text-white border-moonstone-border"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-moonstone-accent text-white border-moonstone-border"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Account Type</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="student"
                    checked={role === 'student'}
                    onChange={() => setRole('student')}
                    className="h-4 w-4 text-blue-500"
                  />
                  <span className="text-gray-300">Student</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={() => setRole('admin')}
                    className="h-4 w-4 text-blue-500"
                  />
                  <span className="text-gray-300">Admin</span>
                </label>
              </div>
            </div>
            
            {/* Demo credentials */}
            <div className="rounded-md bg-moonstone-accent/30 p-3 text-sm text-gray-300">
              <div className="font-medium mb-1">Demo Credentials:</div>
              <div><span className="text-gray-400">Student:</span> student@example.com / password</div>
              <div><span className="text-gray-400">Admin:</span> admin@example.com / password</div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Link to="/" className="text-sm text-gray-400 hover:text-white">
            Back to Home
          </Link>
          <Link to="/register" className="text-sm text-blue-400 hover:text-blue-300">
            Don't have an account? Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
