// components/Interfaces/UserInterface.tsx
export interface User {
  firstName: string;
  lastName: string;
  profile: string;
  email: string;
  birthday: Date; // Added birthday
  role: string; // Added role
  id: string; // Added id
  profileImage: string; // Added profileImage
  isAdmin: boolean; // Added isAdmin
}
