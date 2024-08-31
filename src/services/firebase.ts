import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
// import { User } from '../contexts/authContext';
import { Flat } from '../components/Interfaces/FlatInterface';
import { User } from '../components/Interfaces/UserInterface';
import { auth, db, storage } from '../config/firebase';
import { UserRegister } from '../pages/RegisterPage';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const collectionName = 'users';
const usersColletionRef = collection(db, collectionName);
const flatsCollection = collection(db, 'flats');

// Method to login a User
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

//Method to get user details by email
export const getUserByEmail = async (email: string): Promise<User[]> => {
  try {
    const queryData = query(usersColletionRef, where('email', '==', email));
    const querySnapshot = await getDocs(queryData);

    const users = querySnapshot.docs.map((doc) => {
      const data = doc.data() as User;
      return {
        ...data,
        profile: data.profile || '',
      };
    });

    return users;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};
//Method to create a User
export const createUser = async (user: UserRegister) => {
  await addDoc(usersColletionRef, user);
};

// Method to register auth user in Firebase
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

//Method to register user with firestore in Firebase
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

//Method to upload a profileImage
export const uploadProfileImage = async (file: File) => {
  try {
    const storageRef = ref(storage, `profileImages/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    console.log('Download URL:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Method to create a new flat
export const createFlat = async (flat: Omit<Flat, 'id'>) => {
  try {
    // Add the flat document to Firestore
    const docRef = await addDoc(flatsCollection, flat);
    // Return the newly created document's ID
    return docRef.id;
  } catch (error) {
    console.error('Error creating flat:', error);
    throw error;
  }
};

export const uploadFlatImage = async (file: File) => {
  try {
    const storageRefFlats = ref(storage, `flatImages/${file.name}`);
    await uploadBytes(storageRefFlats, file);
    const downloadURL = await getDownloadURL(storageRefFlats);
    console.log('Download URL:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getFlats = async (): Promise<Flat[]> => {
  const flatsSnapshot = await getDocs(flatsCollection);
  return flatsSnapshot.docs.map((doc) => doc.data() as Flat);
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
    const { id, ...flatData } = flat;

    if (!id) {
      throw new Error('Flat ID is missing.');
    }

    const flatRef = doc(db, 'flats', id);
    await updateDoc(flatRef, flatData);
  } catch (error) {
    console.error('Error updating flat:', error);
    throw error;
  }
};
