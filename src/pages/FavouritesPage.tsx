import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import FlatList from '../components/Flats/FlatList'; // Use FlatList instead of FlatItem
import { useAuth } from '../hooks/useAuth';
import { db } from '../config/firebase';
import { Flat } from '../components/Interfaces/FlatInterface';
import FlatTitle from '../components/Flats/FlatTitle';

const FavouritesPage: React.FC = () => {
  const { user: loggedUser } = useAuth();
  const [favoriteFlats, setFavoriteFlats] = useState<Flat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavoriteFlats = async () => {
      if (loggedUser) {
        try {
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('email', '==', loggedUser.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();

            if (userData.favoriteFlats && userData.favoriteFlats.length > 0) {
              const flatsRef = collection(db, 'flats');
              const flatsQuery = query(
                flatsRef,
                where('flatId', 'in', userData.favoriteFlats),
              );
              const flatsSnapshot = await getDocs(flatsQuery);

              const flats: Flat[] = flatsSnapshot.docs.map((doc) => {
                return {
                  ...doc.data(),
                  flatId: doc.id,
                } as Flat;
              });

              setFavoriteFlats(flats);
            }
          }
        } catch (error) {
          console.error('Error fetching favorite flats:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFavoriteFlats();
  }, [loggedUser]);

  const handleFavoriteToggle = (flatId: string, isFavorite: boolean) => {
    if (!isFavorite) {
      // Remove the flat from the list if it's unfavorited
      setFavoriteFlats((prevFlats) =>
        prevFlats.filter((flat) => flat.flatId !== flatId),
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loggedUser) {
    return <div>You need to be logged in to view your favorite flats.</div>;
  }

  return (
    <div className="favourites-page">
      <FlatTitle title="My Favorite Flats" />{' '}
      {favoriteFlats.length > 0 ? (
        <FlatList
          flats={favoriteFlats}
          onFlatDeleted={(flatId) => {
            setFavoriteFlats((prevFlats) =>
              prevFlats.filter((flat) => flat.flatId !== flatId),
            );
          }}
          onFavoriteToggle={handleFavoriteToggle} // Pass the callback
        />
      ) : (
        <div className="w-full flex align-items-center flex-column justify-center h-full">
          <i className="pi pi-exclamation-triangle text-7xl text-pink-400"></i>
          <p className="text-xl text-600">
            You have no favorite flats yet. See all flats to add favorites
          </p>
          <a
            href="/home"
            rel="noopener noreferrer"
            className="p-button font-bold no-underline"
          >
            See All Flats
          </a>
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
