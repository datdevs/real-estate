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
  updatedAt: Date;
  isDeleted: boolean;
}

export type RealEstateRequest = Omit<RealEstate, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted'>;
