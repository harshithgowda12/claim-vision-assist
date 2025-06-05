import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useClaim } from "@/contexts/ClaimContext";
import { Upload, Image } from "lucide-react";
import { VehicleDetails } from "@/types";

export const ClaimForm = () => {
  const { submitClaim, processingClaim } = useClaim();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    company: ""
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;
    
    await submitClaim(image, description, vehicleDetails);
  };

  const handleVehicleDetailChange = (field: keyof VehicleDetails, value: string | number) => {
    setVehicleDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Vehicle Make</label>
              <Input
                required
                placeholder="e.g., Toyota"
                value={vehicleDetails.make}
                onChange={(e) => handleVehicleDetailChange("make", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Vehicle Model</label>
              <Input
                required
                placeholder="e.g., Camry"
                value={vehicleDetails.model}
                onChange={(e) => handleVehicleDetailChange("model", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Manufacturing Year</label>
              <Input
                required
                type="number"
                min={1900}
                max={new Date().getFullYear()}
                value={vehicleDetails.year}
                onChange={(e) => handleVehicleDetailChange("year", parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Insurance Company</label>
              <Input
                required
                placeholder="e.g., HDFC ERGO"
                value={vehicleDetails.company}
                onChange={(e) => handleVehicleDetailChange("company", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Upload Vehicle Damage Photo
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                isDragging
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 hover:border-primary"
              } ${imagePreview ? "bg-gray-50" : ""}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {imagePreview ? (
                <div className="space-y-4">
                  <div className="relative w-full max-h-72 overflow-hidden rounded-md mx-auto">
                    <img
                      src={imagePreview}
                      alt="Vehicle damage preview"
                      className="mx-auto max-h-72 object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Drag and drop your image here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG or JPEG up to 10MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("imageUpload")?.click()}
                  >
                    <Image className="mr-2 h-4 w-4" /> Select Image
                  </Button>
                </div>
              )}
              <input
                id="imageUpload"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Describe How The Damage Occurred
            </label>
            <Textarea
              id="description"
              placeholder="Please provide details about how the damage happened..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={!image || !description || processingClaim}
          >
            {processingClaim ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2">◌</span>
                Analyzing Damage...
              </span>
            ) : (
              "Submit Claim"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};