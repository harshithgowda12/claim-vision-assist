import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Register = () => {
  const { auth } = useAuth();

  // Redirect if already logged in
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-brand-blue">ClaimVision</span>
            <span className="text-brand-teal">Assist</span>
          </h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Create a new account
          </h2>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;