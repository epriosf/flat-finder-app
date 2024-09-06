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
export interface UserOutput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: Date;
  profile: string;
  isAdmin: boolean;
}
export interface UserOrderBy {
  email: string;
  firstName: string;
  lastName: string;
}

//User Type
export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: Date;
  profile: string;
}
