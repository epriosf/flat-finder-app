import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../config/firebase';
import { User } from '../pages/RegisterPage';

const collectionName = 'users';
const usersColletionRef = collection(db, collectionName);

export const createUser = async (user: User) => {
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
export const registerUserWithFirestore = async (userId: string, user: User) => {
  try {
    await setDoc(doc(db, collectionName, userId), user);
  } catch (error) {
    console.error('Error registering user in Firestore', error);
    throw error;
  }
};

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
