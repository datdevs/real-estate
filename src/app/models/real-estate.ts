export interface RealEstate {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  location: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
}

export type RealEstateRequest = Omit<RealEstate, 'id' | 'createdAt'>;
