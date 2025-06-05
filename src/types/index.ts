export interface User {
    id: string;
    username: string;
    email: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
  }
  
  export interface Claim {
    id: string;
    userId: string;
    image: string;
    description: string;
    damageLocation: DamageLocation;
    damageSeverity: DamageSeverity;
    estimatedValue: number;
    status: ClaimStatus;
    createdAt: string;
    vehicleDetails: VehicleDetails;
  }
  
  export interface VehicleDetails {
    make: string;
    model: string;
    year: number;
    company: string;
  }
  
  export type DamageLocation = 'front' | 'rear' | 'side' | 'unknown';
  export type DamageSeverity = 'minor' | 'moderate' | 'severe' | 'unknown';
  export type ClaimStatus = 'pending' | 'processing' | 'approved' | 'rejected';

  