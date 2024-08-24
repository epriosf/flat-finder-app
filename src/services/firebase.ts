import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { User } from '../contexts/authContext';

const collectionName = 'users';
const usersColletionRef = collection(db, collectionName);

//Method to login a User
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log('User logged in:', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// e// Method to get user details by email
export const getUserByEmail = async (email: string): Promise<User[]> => {
  try {
    const queryData = query(usersColletionRef, where('email', '==', email));
    const querySnapshot = await getDocs(queryData);

    // Convert Firestore data to the User type
    const users = querySnapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;

      return {
        id: doc.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: data.birthday,
        role: data.role,
        profileImage: data.profileImage,
        isAdmin: data.isAdmin,
      } as User;
    });

    return users;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};
