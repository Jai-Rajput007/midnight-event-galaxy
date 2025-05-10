
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "student" | "admin" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for saved user on init
  useEffect(() => {
    const storedUser = localStorage.getItem("moonstone_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // For demo purposes, we'll use a simple login/register flow with localStorage
  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // This is a mock implementation - in a real app, you would validate against a backend
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock users for demo purposes
      const adminUser = { id: "admin1", name: "Admin User", email: "admin@example.com", role: "admin" as UserRole };
      const studentUser = { id: "student1", name: "Student User", email: "student@example.com", role: "student" as UserRole };
      
      let loggedInUser: User | null = null;
      
      if (role === "admin" && email === "admin@example.com" && password === "password") {
        loggedInUser = adminUser;
      } else if (role === "student" && email === "student@example.com" && password === "password") {
        loggedInUser = studentUser;
      } else {
        throw new Error("Invalid credentials");
      }
      
      localStorage.setItem("moonstone_user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send this data to your backend
      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        role: "student" // Default role for new registrations
      };
      
      localStorage.setItem("moonstone_user", JSON.stringify(newUser));
      setUser(newUser);
      
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("moonstone_user");
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
