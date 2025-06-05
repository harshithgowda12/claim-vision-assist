import { useAuth } from "@/contexts/AuthContext";
import { useClaim } from "@/contexts/ClaimContext";
import { Navigate } from "react-router-dom";
import { ClaimForm } from "@/components/claims/ClaimForm";
import { ClaimResult } from "@/components/claims/ClaimResult";

const NewClaim = () => {
  const { auth } = useAuth();
  const { activeClaim } = useClaim();

  // Redirect if not logged in
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container px-4 py-8 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {activeClaim ? "Damage Assessment" : "Submit New Claim"}
      </h1>
      
      {activeClaim ? <ClaimResult /> : <ClaimForm />}
    </div>
  );
};

export default NewClaim;