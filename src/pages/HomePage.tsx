import FlatList from '../components/Flats/FlatList';
import FlatTitle from '../components/Flats/FlatTitle';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Flat } from '../components/Interfaces/FlatInterface';
import { useEffect, useState } from 'react';
import { getFlats } from '../services/firebase';

const HomePage = () => {
  const [flats, setFlats] = useState<Flat[]>([]);
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(9);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFlats();
      setFlats(data as Flat[]);
    };
    fetchData();
  }, []);

  // Scroll to top whenever the page changes
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }, [first]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);

    // Try a basic scroll to the top
    window.scrollTo(0, 0);
  };

  const handleFlatDeleted = (deletedFlatId: string) => {
    setFlats(flats.filter((flat) => flat.flatId !== deletedFlatId));
  };

  const currentFlats = flats.slice(first, first + rows);
  return (
    <>
      <FlatTitle title="Home" />
      <FlatList flats={currentFlats} onFlatDeleted={handleFlatDeleted} />
      <Paginator
        first={first}
        rows={rows}
        totalRecords={flats.length}
        rowsPerPageOptions={[9, 12, 15, 18]}
        onPageChange={onPageChange}
      />
    </>
  );
};
export default HomePage;
