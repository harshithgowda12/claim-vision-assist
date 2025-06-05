import React, { createContext, useContext, useState } from "react";
import { Claim, DamageLocation, DamageSeverity, VehicleDetails } from "@/types";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

interface ClaimContextProps {
  claims: Claim[];
  activeClaim: Claim | null;
  loadingClaims: boolean;
  processingClaim: boolean;
  submitClaim: (image: File, description: string, vehicleDetails: VehicleDetails) => Promise<void>;
  setActiveClaim: (claim: Claim | null) => void;
}

const ClaimContext = createContext<ClaimContextProps | undefined>(undefined);

export const ClaimProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth } = useAuth();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [activeClaim, setActiveClaim] = useState<Claim | null>(null);
  const [loadingClaims, setLoadingClaims] = useState<boolean>(false);
  const [processingClaim, setProcessingClaim] = useState<boolean>(false);
  
  const calculateBaseValue = (make: string, year: number): number => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    
    // More precise base values for Indian market (in USD)
    const baseValues: { [key: string]: number } = {
      // Japanese brands
      'toyota': 11000,
      'honda': 10500,
      'nissan': 9000,
      'suzuki': 7500,
      'lexus': 18000,

      // Korean brands
      'hyundai': 8500,
      'kia': 9000,
      
      // Indian brands
      'maruti': 6500,
      'tata': 7000,
      'mahindra': 9000,
      
      // European brands
      'volkswagen': 10500,
      'skoda': 10000,
      'bmw': 19000,
      'mercedes': 21000,
      'audi': 19000,
      'renault': 8500,
      
      // American brands
      'ford': 9500,
      'chevrolet': 9000,
      'jeep': 13000,
      
      // Chinese brands
      'mg': 9000,
      
      'default': 9000
    };
    
    const baseValue = baseValues[make.toLowerCase()] || baseValues.default;
    
    // Refined depreciation calculation based on Indian market
    let depreciationRate = 0.07; // Base depreciation rate
    
    // Premium brands depreciate faster in first few years
    if (['bmw', 'mercedes', 'audi', 'lexus'].includes(make.toLowerCase())) {
      depreciationRate = 0.09;
    }
    // Budget brands hold value better in Indian market
    else if (['maruti', 'tata'].includes(make.toLowerCase())) {
      depreciationRate = 0.06;
    }
    
    const depreciation = Math.min(0.65, age * depreciationRate);
    return baseValue * (1 - depreciation);
  };

  const calculatePartsCost = (company: string, vehicleDetails: VehicleDetails, severity: DamageSeverity): number => {
    // Insurance company multipliers (how much they typically cover)
    const insuranceMultiplier: { [key: string]: number } = {
      'hdfc ergo': 0.92,
      'icici lombard': 0.88,
      'bajaj allianz': 0.90,
      'new india assurance': 0.85,
      'tata aig': 0.89,
      'reliance general': 0.86,
      'liberty general': 0.88,
      'oriental insurance': 0.84,
      'united india': 0.83,
      'national insurance': 0.85,
      'go digit': 0.87,
      'acko': 0.86,
      'sbi general': 0.85,
      'royal sundaram': 0.88,
      'shriram general': 0.84,
      'default': 0.87
    };
    
    // Brand specific parts cost multipliers (higher = more expensive parts)
    const partsCostMultiplier: { [key: string]: number } = {
      'maruti': 0.8,
      'tata': 0.85,
      'hyundai': 0.95,
      'mahindra': 0.9,
      'toyota': 1.2,
      'honda': 1.15,
      'volkswagen': 1.3,
      'skoda': 1.25,
      'ford': 1.1,
      'kia': 1.0,
      'bmw': 1.8,
      'mercedes': 1.9,
      'audi': 1.75,
      'mg': 1.05,
      'nissan': 1.1,
      'renault': 1.05,
      'jeep': 1.3,
      'suzuki': 0.9,
      'default': 1.0
    };
    
    // Calculate model-specific parts multiplier
    const brandMultiplier = partsCostMultiplier[vehicleDetails.make.toLowerCase()] || partsCostMultiplier.default;
    
    // Insurance coverage multiplier
    const insuranceCoverage = insuranceMultiplier[company.toLowerCase()] || insuranceMultiplier.default;
    
    // Age factor (older cars have cheaper parts in aftermarket but higher labor)
    const currentYear = new Date().getFullYear();
    const age = currentYear - vehicleDetails.year;
    const ageFactor = age <= 3 ? 1.0 : (age <= 7 ? 0.9 : 0.8);
    
    return brandMultiplier * insuranceCoverage * ageFactor;
  };

  const submitClaim = async (image: File, description: string, vehicleDetails: VehicleDetails) => {
    if (!auth.user) {
      toast.error("You must be logged in to submit a claim.");
      return;
    }
    
    setProcessingClaim(true);
    try {
      const imageBase64 = await convertToBase64(image);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const damageLocations: DamageLocation[] = ['front', 'rear', 'side'];
      const damageSeverities: DamageSeverity[] = ['minor', 'moderate', 'severe'];
      
      const randomLocation = damageLocations[Math.floor(Math.random() * damageLocations.length)];
      const randomSeverity = damageSeverities[Math.floor(Math.random() * damageSeverities.length)];
      
      const baseValue = calculateBaseValue(vehicleDetails.make, vehicleDetails.year);
      
      const partsCostMultiplier = calculatePartsCost(vehicleDetails.company, vehicleDetails, randomSeverity);
      
      // More accurate repair percentages based on location and severity
      let repairPercentage = 0;
      
      // Different damage locations have different repair costs
      if (randomLocation === 'front') {
        // Front damages are typically more expensive (more parts, sensors, etc.)
        switch (randomSeverity) {
          case 'minor': repairPercentage = 0.015; break;
          case 'moderate': repairPercentage = 0.065; break;
          case 'severe': repairPercentage = 0.13; break;
        }
      } else if (randomLocation === 'rear') {
        // Rear damages are medium cost
        switch (randomSeverity) {
          case 'minor': repairPercentage = 0.012; break;
          case 'moderate': repairPercentage = 0.055; break;
          case 'severe': repairPercentage = 0.11; break;
        }
      } else { // side
        // Side damages vary based on components affected
        switch (randomSeverity) {
          case 'minor': repairPercentage = 0.01; break;
          case 'moderate': repairPercentage = 0.045; break;
          case 'severe': repairPercentage = 0.09; break;
        }
      }
      
      // Final estimated value combines base value, repair percentage, and parts cost multiplier
      const estimatedValue = baseValue * repairPercentage * partsCostMultiplier;
      
      const newClaim: Claim = {
        id: `claim-${Date.now()}`,
        userId: auth.user.id,
        image: imageBase64,
        description,
        damageLocation: randomLocation,
        damageSeverity: randomSeverity,
        estimatedValue,
        status: 'pending',
        createdAt: new Date().toISOString(),
        vehicleDetails
      };
      
      setClaims(prevClaims => [newClaim, ...prevClaims]);
      setActiveClaim(newClaim);
      
      toast.success("Claim processed successfully!");
    } catch (error) {
      console.error("Error processing claim:", error);
      toast.error("Failed to process claim. Please try again.");
    } finally {
      setProcessingClaim(false);
    }
  };
  
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };
  
  return (
    <ClaimContext.Provider
      value={{
        claims,
        activeClaim,
        loadingClaims,
        processingClaim,
        submitClaim,
        setActiveClaim
      }}
    >
      {children}
    </ClaimContext.Provider>
  );
};

export const useClaim = () => {
  const context = useContext(ClaimContext);
  if (!context) {
    throw new Error("useClaim must be used within a ClaimProvider");
  }
  return context;
};