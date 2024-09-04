const MyFlatsPage = () => {
  return <>MyFlats Page</>;
};

export default MyFlatsPage;

// import React, { useState, useEffect } from 'react';
// import FlatList from './FlatList';
// import { Flat } from '../Interfaces/FlatInterface';
// import { getUserFlats } from '../../services/firebase'; // Example function
// import { useAuth } from '../../hooks/useAuth';
// import FlatTitle from '../Commons/FlatTitle';

// const MyFlatsPage: React.FC = () => {
//   const [flats, setFlats] = useState<Flat[]>([]);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user) {
//       const fetchMyFlats = async () => {
//         const data = await getUserFlats(user.email); // Fetch flats created by the user
//         setFlats(data);
//       };
//       fetchMyFlats();
//     }
//   }, [user]);

//   const handleDelete = async (flatId: string) => {
//     try {
//       await deleteFlat(flatId);
//       setFlats(flats.filter((flat) => flat.flatId !== flatId));
//     } catch (error) {
//       console.error('Failed to delete the flat:', error);
//     }
//   };

//   return (
//     <div>
//       <FlatTitle title="My Flats" />
//       <FlatList flats={flats} onDelete={handleDelete} />
//     </div>
//   );
// };

// export default MyFlatsPage;
