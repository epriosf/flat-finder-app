import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
// import { Image } from 'primereact/image';
import { useEffect, useState } from 'react';
import { getUserByEmail } from '../../services/firebase';
import { Dialog } from 'primereact/dialog';
import { Flat } from '../Interfaces/FlatInterface'; // Updated import
import { User } from '../Interfaces/UserInterface';
import EditFlatPage from '../../pages/EditFlatPage';
import { Avatar } from 'primereact/avatar';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import FlatImg from './../../images/apt-21.jpg';
import { db } from '../../config/firebase';

interface FlatItemProps {
  flat: Flat;
  activeDialog: string | null;
  setActiveDialog: (id: string | null) => void;
  onDeleteRequest: (flatId: string) => void;
}

const FlatItem: React.FC<FlatItemProps> = ({
  flat,
  activeDialog,
  setActiveDialog,
  onDeleteRequest,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [fullFlat, setFullFlat] = useState<Flat | null>(null);

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        console.log('Fetching flat with ID:', flat.flatId);
        const flatRef = doc(db, 'flats', flat.flatId!); // Ensure flat has an id here
        const flatSnap = await getDoc(flatRef);
        if (flatSnap.exists()) {
          const fetchedFlat = {
            ...flatSnap.data(),
            flatId: flatSnap.id,
          } as Flat;
          console.log('Fetched flat:', fetchedFlat);
          setFullFlat(fetchedFlat); // Assign id from document
        } else {
          console.error('Flat does not exist.');
        }
      } catch (error) {
        console.error('Error fetching flat:', error);
      }
    };

    if (dialogVisible && flat.flatId) {
      fetchFlat();
    }
  }, [dialogVisible, flat.flatId]);

  // Ensure you check and convert Timestamp to Date
  const formatDate = (date: Timestamp | Date): string => {
    // Convert Timestamp to Date if needed
    const dateObj = date instanceof Timestamp ? date.toDate() : date;

    // Create an Intl.DateTimeFormat instance for custom formatting
    const formatter = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return formatter.format(dateObj);
  };

  const formattedDate = flat.dateAvailable
    ? formatDate(flat.dateAvailable)
    : 'N/A';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user by email (flatUser)
        const fetchedUser = await getUserByEmail(flat.flatUser);
        // Assuming getUserByEmail returns an array, pick the first user if there's any
        setUser(fetchedUser.length > 0 ? fetchedUser[0] : null);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [flat.flatUser]);

  const handleEditClick = () => {
    setDialogVisible(true);
    setActiveDialog(flat.flatId);
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setActiveDialog(null);
  };

  // const confirmDelete = () => {
  //   confirmDialog({
  //     message: 'Are you sure you want to delete this flat?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     acceptClassName: 'p-button-danger',
  //     accept: () => onDeleteRequest(flat.flatId),
  //   });
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const header = (
    <img
      alt={`${flat.streetNumber} ${flat.streetName}`}
      src={flat.flatImage || FlatImg}
    />
  );
  const footer = (
    <div className="flex gap-2">
      <Button
        icon="pi pi-trash"
        className="bg-primary-100"
        size="small"
        rounded
        text
        raised
        aria-label="Delete"
        onClick={() => onDeleteRequest(flat.flatId)} // Trigger the delete confirmation from FlatList
      />
      <Button
        icon="pi pi-pencil"
        className="bg-primary-100"
        size="small"
        rounded
        text
        raised
        aria-label="Edit"
        onClick={handleEditClick}
      />
      <Button
        icon="pi pi-heart"
        className="bg-primary-100"
        size="small"
        rounded
        text
        raised
        aria-label="Favorite"
      />
    </div>
  );

  return (
    <>
      <Card
        title={`${flat.streetName} ${flat.streetNumber}`}
        subTitle={flat.city}
        footer={footer}
        header={header}
        className="flat-card border-round-xl"
      >
        <div className="flex flex-column gap-1 mb-3 pt-2">
          <p className="text-lg font-bold p-0 m-0">Price: ${flat.price}</p>
          {/* <p className="p-0 m-0 text-600">Built on {flat.yearBuilt}</p> */}
          <p className="p-0 m-0 text-600">
            Built on {flat.yearBuilt ? flat.yearBuilt : 'N/A'}
          </p>

          <div className="flex gap-2">
            <p className="p-0 m-0 text-600">{flat.areaSize} m²</p>
            <p className="p-0 m-0 text-600">{flat.rooms} rooms</p>
            <p className="p-0 m-0 text-600">{flat.bathrooms} baths</p>
          </div>
        </div>
        <p className="p-0 m-0 text-600">
          Available on: <span className="font-bold">{formattedDate}</span>
        </p>
        <Chip
          className={`text-indigo-500 mt-2 ${flat.hasAc ? 'chip-yes' : 'chip-no'}`}
          label={flat.hasAc ? 'Has AC' : 'No AC'}
          icon="pi pi-asterisk"
        />
        {/* <p className="p-0 m-0 text-600">Has AC: {flat.hasAc ? 'Yes' : 'No'}</p> */}

        {user && (
          <div className="mt-4 flex gap-2 align-items-center">
            <Avatar
              image={user.profile}
              imageAlt="{user.firstName} {user.lastName}"
              className="mr-2"
              size="large"
              shape="circle"
            />
            <div>
              <p className="text-600 m-0">
                Listed by {user.firstName} {user.lastName}
              </p>
              <p className="text-600 m-0">{user.email}</p>
            </div>
          </div>
        )}
      </Card>
      <Dialog
        header="Edit Flat"
        visible={activeDialog === flat.flatId && dialogVisible}
        style={{ width: '50vw' }}
        onHide={handleDialogClose}
      >
        {fullFlat ? (
          <EditFlatPage flat={fullFlat} onClose={handleDialogClose} />
        ) : (
          <div>Loading...</div> // Display a loading indicator or message
        )}{' '}
      </Dialog>
    </>
  );
};
export default FlatItem;
