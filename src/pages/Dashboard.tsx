import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClaimHistory } from "@/components/claims/ClaimHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClaim } from "@/contexts/ClaimContext";

const Dashboard = () => {
  const { auth } = useAuth();
  const { claims } = useClaim();

  // Redirect if not logged in
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const pendingClaims = claims.filter(claim => claim.status === "pending");
  const approvedClaims = claims.filter(claim => claim.status === "approved");
  const totalClaimValue = claims.reduce((sum, claim) => sum + claim.estimatedValue, 0);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link to="/new-claim">New Claim</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Claims
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{claims.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Claims
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingClaims.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Claim Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${totalClaimValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <ClaimHistory />
      </div>

      {claims.length === 0 && (
        <div className="bg-muted rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">No claims yet!</h2>
          <p className="mb-6 text-muted-foreground">
            Submit your first vehicle damage claim to get started.
          </p>
          <Button asChild>
            <Link to="/new-claim">Create Your First Claim</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;