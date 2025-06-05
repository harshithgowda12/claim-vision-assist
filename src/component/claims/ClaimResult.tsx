import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClaim } from "@/contexts/ClaimContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export const ClaimResult = () => {
  const { activeClaim, setActiveClaim } = useClaim();

  if (!activeClaim) {
    return null;
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Damage Assessment Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="rounded-md overflow-hidden w-full max-w-md">
            <img
              src={activeClaim.image}
              alt="Vehicle damage"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Vehicle Details</h3>
            <p className="font-semibold text-lg capitalize">
              {activeClaim.vehicleDetails.year} {activeClaim.vehicleDetails.make} {activeClaim.vehicleDetails.model}
            </p>
            <p className="text-sm text-muted-foreground">
              Insurance Provider: {activeClaim.vehicleDetails.company}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Damage Location</h3>
            <p className="font-semibold text-lg capitalize">{activeClaim.damageLocation}</p>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Damage Severity</h3>
            <div className="flex items-center gap-2">
              <Badge className={`${getSeverityColor(activeClaim.damageSeverity)} capitalize`}>
                {activeClaim.damageSeverity}
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Claim Status</h3>
            <p className="capitalize">{activeClaim.status}</p>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Estimated Value</h3>
            <p className="font-semibold text-lg">
              {formatCurrency(activeClaim.estimatedValue)}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-sm text-muted-foreground mb-1">Damage Description</h3>
          <p className="text-sm bg-muted p-3 rounded-md">{activeClaim.description}</p>
        </div>

        <div className="flex justify-between gap-4">
          <Button variant="outline" onClick={() => setActiveClaim(null)}>
            Submit Another Claim
          </Button>
          <Button>Download Report</Button>
        </div>
      </CardContent>
    </Card>
  );
};