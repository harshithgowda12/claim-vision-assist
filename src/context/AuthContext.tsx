import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthState, User } from "@/types";
import { toast } from "sonner";

interface AuthContextProps {
  auth: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ user: null, isAuthenticated: false });
  const [loading, setLoading] = useState<boolean>(true);

  // Mock login function (in a real app, this would call an API)
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate credentials (in a real app, this would check against a database)
      if (email === "demo@example.com" && password === "password") {
        const user: User = {
          id: "1",
          username: "Demo User",
          email: "demo@example.com"
        };
        
        setAuth({
          user,
          isAuthenticated: true
        });
        
        // Store in local storage for persistence
        localStorage.setItem("user", JSON.stringify(user));
        
        toast.success("Successfully logged in!");
        return true;
      } else {
        toast.error("Invalid email or password");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Mock registration function
  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would create a new user in the database
      const user: User = {
        id: "2", // In a real app, this would be generated
        username,
        email
      };
      
      setAuth({
        user,
        isAuthenticated: true
      });
      
      // Store in local storage for persistence
      localStorage.setItem("user", JSON.stringify(user));
      
      toast.success("Registration successful!");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };
  
  // Check for user in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuth({
          user,
          isAuthenticated: true
        });
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);
  
  return (
    <AuthContext.Provider value={{ auth, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};