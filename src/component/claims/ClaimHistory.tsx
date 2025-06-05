import { useClaim } from "@/contexts/ClaimContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

export const ClaimHistory = () => {
  const { claims, setActiveClaim } = useClaim();

  if (claims.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Claim History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No claims submitted yet.</p>
        </CardContent>
      </Card>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "minor":
        return "bg-yellow-500";
      case "moderate":
        return "bg-orange-500";
      case "severe":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-500";
      case "processing":
        return "bg-yellow-500";
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Claim History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => setActiveClaim(claim)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={claim.image}
                    alt="Vehicle damage thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium capitalize">
                        {claim.damageLocation} Damage
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(claim.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(claim.estimatedValue)}</p>
                      <div className="flex gap-2 mt-1 justify-end">
                        <Badge
                          className={`${getSeverityColor(
                            claim.damageSeverity
                          )} text-xs capitalize`}
                        >
                          {claim.damageSeverity}
                        </Badge>
                        <Badge
                          className={`${getStatusColor(claim.status)} text-xs capitalize`}
                        >
                          {claim.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};