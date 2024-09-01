// import firebase from 'firebase/compat/app';
import { Timestamp } from 'firebase/firestore';

// components/Interfaces/FlatInterface.tsx
export interface Flat {
  flatId: string;
  areaSize: number | null;
  city: string;
  dateAvailable: Timestamp | Date | null;
  hasAc: boolean;
  price: number | null;
  streetName: string;
  streetNumber: number | null;
  yearBuilt: number | null;
  flatImage: string;
  //   creator: string; // This will be the ID of the creator from FlatUser
  flatUser: string;
  rooms: number | null;
  bathrooms: number | null;
}
