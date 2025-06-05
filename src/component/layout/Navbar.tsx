import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "lucide-react";

export const Navbar = () => {
  const { auth, logout } = useAuth();
  
  return (
    <nav className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-brand-blue">ClaimVision</span>
              <span className="ml-1 text-brand-teal">Assist</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {auth.isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-4">
                  <Link to="/dashboard" className="text-gray-700 hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link to="/new-claim" className="text-gray-700 hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">
                    New Claim
                  </Link>
                </div>
                
                <div className="border-l pl-4 flex items-center">
                  <div className="mr-3 hidden md:block">
                    <div className="text-sm font-medium">{auth.user?.username}</div>
                    <div className="text-xs text-gray-500">{auth.user?.email}</div>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="rounded-full bg-gray-100" asChild>
                    <div>
                      <User className="h-5 w-5 text-gray-700" />
                    </div>
                  </Button>
                  
                  <Button variant="ghost" className="ml-2 text-sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};