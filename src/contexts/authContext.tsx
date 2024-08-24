import React, { createContext, ReactNode, useState, useEffect } from 'react';
import {
  initializeAuthPersistence,
  loginUser,
  logoutUser,
  onAuthStateChange,
} from '../services/authService';
import { getUserByEmail } from '../services/firebase';

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
  role: string;
  id: string;
  profileImage: string;
  isAdmin: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      await initializeAuthPersistence();
    };

    initializeAuth();

    const unsubscribe = onAuthStateChange(async (authUser) => {
      if (authUser) {
        // Fetch the user from the database using their email
        const userDb = await getUserByEmail(authUser.email!);

        if (userDb.length > 0) {
          const userFromDb = userDb[0]; // Assuming the database returns an array

          // Set the user state with the object retrieved from the database
          setUser({
            ...userFromDb, // Assuming userFromDb contains all the properties matching the User interface
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const authUser = await loginUser(email, password);

      if (!authUser) {
        throw new Error('Login failed: User not found.');
      }

      const userDb = await getUserByEmail(authUser.email!);
      console.log(userDb);

      if (userDb.length > 0) {
        return userDb[0];
      } else {
        throw new Error('Login failed: User not found in the database.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
