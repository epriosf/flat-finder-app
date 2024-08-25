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
import { Timestamp } from 'firebase/firestore';

// interface FlatItemProps {
//   flat: Flat;
//   onEdit: (flat: Flat) => void; // Callback to handle edit action
// }

const FlatItem = ({ flat }: { flat: Flat }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

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

  const formattedDate = formatDate(flat.dateAvailable);

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
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const header = (
    // <img alt={`${flat.streetNumber} ${flat.streetName}`} src={flat.flatImage} />
    <img
      alt={`${flat.streetNumber} ${flat.streetName}`}
      src={
        flat.flatImage ||
        `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/b6/2b/apartment-hotels.jpg?w=1200&h=-1&s=1`
      }
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
          <p className="p-0 m-0 text-600">Built on {flat.yearBuilt}</p>
          <div className="flex gap-2">
            <p className="p-0 m-0 text-600">{flat.areaSize} m²</p>
            <p className="p-0 m-0 text-600">{flat.rooms} room.</p>
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
        visible={dialogVisible}
        style={{ width: '50vw' }}
        onHide={handleDialogClose}
      >
        <EditFlatPage flat={flat} onClose={handleDialogClose} />
      </Dialog>
    </>
  );
};
export default FlatItem;
