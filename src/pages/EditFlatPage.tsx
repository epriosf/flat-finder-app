import React, { useEffect, useState } from 'react';
import { Flat } from '../components/Interfaces/FlatInterface';
import { getUserByEmail } from '../services/firebase';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

interface EditFlatPageProps {
  flat: Flat;
  onClose: () => void;
}

const EditFlatPage: React.FC<EditFlatPageProps> = ({ flat, onClose }) => {
  const [updatedFlat, setUpdatedFlat] = useState<Flat>(flat);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user by email (flat.flatUser)
        await getUserByEmail(flat.flatUser);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [flat.flatUser]);

  const handleSave = async () => {
    try {
      // Save updated flat details
      // Call a service function to update flat details in Firestore
      // Example: await updateFlat(updatedFlat);
      onClose(); // Close dialog after saving
    } catch (error) {
      console.error('Error saving flat details:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Flat</h2>
      <div className="p-field">
        <label htmlFor="streetName">Street Name</label>
        <InputText
          id="streetName"
          value={updatedFlat.streetName}
          onChange={(e) =>
            setUpdatedFlat({ ...updatedFlat, streetName: e.target.value })
          }
        />
      </div>
      {/* Add more fields as necessary */}
      <Button label="Save" icon="pi pi-check" onClick={handleSave} />
      <Button label="Cancel" icon="pi pi-times" onClick={onClose} />
    </div>
  );
};

export default EditFlatPage;
