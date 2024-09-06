import {
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Message } from '../components/Interfaces/MessageInterface';
import { db } from '../config/firebase';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  profile: string;
}

const useMessage = (flatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);

      try {
        // Reference to the messages collection
        const messagesRef = collection(db, 'messages');

        // Query messages where the flatId matches
        const q = query(messagesRef, where('flatId', '==', flatId));

        // Fetch documents using the query
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

        // Create an array of messages with user information
        const fetchedMessages: Message[] = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data() as Omit<Message, 'messageId'>; // Get message data without messageId

            // Now we query the users collection using the userEmail from the message
            const usersRef = collection(db, 'users');
            const userQuery = query(
              usersRef,
              where('email', '==', data.userEmail),
            );
            const userSnapshot = await getDocs(userQuery);

            let firstName = 'Unknown'; // Default name if the user is not found
            let lastName = 'Unknown';
            let profile = '';
            if (!userSnapshot.empty) {
              const userData = userSnapshot.docs[0].data() as User;
              firstName = userData.firstName; // Get userName from user data
              lastName = userData.lastName;
              profile = userData.profile;
            }

            return {
              messageId: doc.id, // Add the messageId
              ...data, // Spread the message data
              firstName, // Add the userName to the message
              lastName,
              profile,
            };
          }),
        );

        setMessages(fetchedMessages);
      } catch (error) {
        setError('Failed to fetch messages and users');
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [flatId]);

  return { messages, loading, error };
};

export default useMessage;
