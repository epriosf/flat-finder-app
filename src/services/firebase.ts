import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../config/firebase';
import { User } from '../contexts/authContext';
import { UserRegister } from '../pages/RegisterPage';

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

//Method to get user details by email
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
//Method to create a User
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
