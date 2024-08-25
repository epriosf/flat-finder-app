// components/Flats/FlatList.tsx
import { useEffect, useState } from 'react';
import { getFlats } from '../../services/firebase';
import FlatItem from './FlatItem';
import { Flat } from '../Interfaces/FlatInterface'; // Updated import

const FlatList = () => {
  const [flats, setFlats] = useState<Flat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFlats();
      setFlats(data as Flat[]);
    };
    fetchData();
  }, []);

  return (
    <div className="grid">
      {flats.map((flat, index) => (
        <div key={index} className="col-12 md:col-6 lg:col-4">
          <FlatItem flat={flat} />
        </div>
      ))}
    </div>
  );
};

export default FlatList;
