import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db, storage } from '../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  collection,
  // DocumentData,
  getDocs,
  query,
  where,
  setDoc,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
// import { User } from '../contexts/authContext';
import { UserRegister } from '../pages/RegisterPage';
import { Flat } from '../components/Interfaces/FlatInterface';
import { UserFlat } from '../components/Interfaces/UserFlatInterface';

const collectionName = 'users';
const usersColletionRef = collection(db, collectionName);
const flatsCollection = collection(db, 'flats');

// export interface FlatUser {
//   firstName: string;
//   lastName: string;
//   profile: string;
//   email: string;
// }
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
// export const getUserByEmail = async (email: string): Promise<User[]> => {
//   try {
//     const queryData = query(usersColletionRef, where('email', '==', email));
//     const querySnapshot = await getDocs(queryData);

//     // Convert Firestore data to the User type
//     const users = querySnapshot.docs.map((doc) => {
//       const data = doc.data() as DocumentData;

//       return {
//         id: doc.id,
//         email: data.email,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         birthday: data.birthday,
//         role: data.role,
//         profileImage: data.profileImage,
//         isAdmin: data.isAdmin,
//       } as User;
//     });

//     return users;
//   } catch (error) {
//     console.error('Error fetching user by email:', error);
//     throw error;
//   }
// };

export const getUserByEmail = async (email: string): Promise<UserFlat[]> => {
  try {
    const queryData = query(usersColletionRef, where('email', '==', email));
    const querySnapshot = await getDocs(queryData);

    const users = querySnapshot.docs.map((doc) => {
      const data = doc.data() as UserFlat; // Ensure it matches UserFlat

      return {
        ...data,
        profile: data.profile || '', // Ensure profile is included
      };
    });

    return users;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};
// The `getUserById` function should return data matching the `FlatUser` interface
export const getUserById = async (userId: string): Promise<UserFlat | null> => {
  try {
    console.log(`Fetching user data for ID: ${userId}`);
    const userDocRef = doc(db, 'users', userId);
    console.log(`Document reference path: ${userDocRef.path}`);

    const userDoc = await getDoc(userDocRef);
    console.log(`Document exists: ${userDoc.exists()}`);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log(`User data found:`, userData);
      return userData as UserFlat;
    } else {
      console.error(`User with ID ${userId} not found.`);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
const testUserId = 'AZG3EElxZNXfrmQm8cMg5d1UhII3'; // Replace with an actual user ID from your Firestore
getUserById(testUserId);
// export const getUserById = async (userId: string): Promise<UserFlat | null> => {
//   try {
//     // Log the userId and the document reference
//     console.log(`Fetching user data for ID: ${userId}`);
//     const userDocRef = doc(db, 'users', userId);
//     console.log(`Document reference: ${userDocRef.path}`);

//     const userDoc = await getDoc(userDocRef);
//     if (userDoc.exists()) {
//       console.log(`User data found:`, userDoc.data());
//       return userDoc.data() as UserFlat;
//     } else {
//       console.error(`User with ID ${userId} not found.`);
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     throw error;
//   }
// };

export const createUser = async (user: UserRegister) => {
  await addDoc(usersColletionRef, user);
};
//Method to regsister auth user in Firebase
export const registerUserWithAuth = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error('Error registering user with auth:', error);
    throw error;
  }
};

//method to register user with firestore in Firebase
export const registerUserWithFirestore = async (
  userId: string,
  user: UserRegister,
) => {
  try {
    await setDoc(doc(db, collectionName, userId), user);
  } catch (error) {
    console.error('Error registering user in Firestore', error);
    throw error;
  }
};

export const uploadProfileImage = async (file: File) => {
  try {
    const storageRef = ref(storage, `profileImages/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    console.log('Download URL:', downloadURL); // Add this line to debug
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// The `getFlats` function should return data matching the `Flat` interface
export const getFlats = async (): Promise<Flat[]> => {
  const flatsSnapshot = await getDocs(flatsCollection);
  return flatsSnapshot.docs.map((doc) => doc.data() as Flat); // Type assertion to Flat
};

export const uploadFlatImage = async (file: File) => {
  try {
    const storageRefFlats = ref(storage, `flatImages/${file.name}`);
    await uploadBytes(storageRefFlats, file);
    const downloadURL = await getDownloadURL(storageRefFlats);

    console.log('Download URL:', downloadURL); // Add this line to debug
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getFlatsByOwner = async (ownerEmail: string): Promise<Flat[]> => {
  try {
    const flatsSnapshot = await getDocs(
      query(flatsCollection, where('flatUser', '==', ownerEmail)),
    );
    return flatsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        areaSize: data.areaSize,
        city: data.city,
        dateAvailable: data.dateAvailable.toDate(),
        hasAc: data.hasAc,
        price: data.price,
        streetName: data.streetName,
        streetNumber: data.streetNumber,
        yearBuilt: data.yearBuilt,
        flatImage: data.flatImage,
        flatUser: data.flatUser,
        rooms: data.rooms,
        bathrooms: data.bathrooms,
      } as Flat;
    });
  } catch (error) {
    console.error('Error fetching flats by owner:', error);
    throw error;
  }
};

export const getFlatsByUserId = async (userEmail: string): Promise<Flat[]> => {
  try {
    const flatsSnapshot = await getDocs(
      query(flatsCollection, where('flatUser', '==', userEmail)),
    );
    return flatsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        areaSize: data.areaSize,
        city: data.city,
        dateAvailable: data.dateAvailable.toDate(),
        hasAc: data.hasAc,
        price: data.price,
        streetName: data.streetName,
        streetNumber: data.streetNumber,
        yearBuilt: data.yearBuilt,
        flatImage: data.flatImage,
        flatUser: data.flatUser,
        rooms: data.rooms,
        bathrooms: data.bathrooms,
      } as Flat;
    });
  } catch (error) {
    console.error('Error fetching flats by user email:', error);
    throw error;
  }
};

export const getFlatById = async (flatId: string): Promise<Flat | null> => {
  try {
    const flatDoc = await getDoc(doc(db, 'flats', flatId));
    if (flatDoc.exists()) {
      const data = flatDoc.data();
      return {
        id: flatDoc.id,
        areaSize: data.areaSize,
        city: data.city,
        dateAvailable: data.dateAvailable.toDate(),
        hasAc: data.hasAc,
        price: data.price,
        streetName: data.streetName,
        streetNumber: data.streetNumber,
        yearBuilt: data.yearBuilt,
        flatImage: data.flatImage,
        flatUser: data.flatUser,
        rooms: data.rooms,
        bathrooms: data.bathrooms,
      } as Flat;
    } else {
      console.error(`Flat with ID ${flatId} not found.`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching flat by ID:', error);
    throw error;
  }
};

export const updateFlat = async (flat: Flat) => {
  try {
    const { id, ...flatData } = flat; // Exclude id from the data
    const flatRef = doc(db, 'flats', id);
    await updateDoc(flatRef, flatData); // Pass only the flat data to updateDoc
  } catch (error) {
    console.error('Error updating flat:', error);
    throw error;
  }
};
