const FavouritePage = () => {
  return <>Favourite Page</>;
};
export default FavouritePage;

// import React, { useState, useEffect } from 'react';
// import FlatList from './FlatList';
// import { Flat } from '../Interfaces/FlatInterface';
// import { getFavoriteFlats } from '../../services/firebase'; // Example function
// import FlatTitle from '../Commons/FlatTitle';

// const FavoritesPage: React.FC = () => {
//   const [flats, setFlats] = useState<Flat[]>([]);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       const data = await getFavoriteFlats(); // Fetch or filter favorite flats
//       setFlats(data);
//     };
//     fetchFavorites();
//   }, []);

//   return (
//     <div>
//       <FlatTitle title="My Favorite Flats" showOrder={false} showFilter={false} />
//       <FlatList flats={flats} />
//     </div>
//   );
// };

// export default FavoritesPage;
