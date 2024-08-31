// import firebase from 'firebase/compat/app';
import { Timestamp } from 'firebase/firestore';

// components/Interfaces/FlatInterface.tsx
export interface Flat {
  id: string;
  areaSize: number;
  city: string;
  dateAvailable: Timestamp | Date; // Consider using Date type if possible
  hasAc: boolean;
  price: number;
  streetName: string;
  streetNumber: number;
  yearBuilt: number;
  flatImage: string;
  //   creator: string; // This will be the ID of the creator from FlatUser
  flatUser: string;
  rooms: number;
  bathrooms: number;
}
