import FlatForm from '../components/Flats/FlatForm';
import { Flat } from '../components/Interfaces/FlatInterface';

interface EditFlatPageProps {
  flat: Flat;
  onClose: () => void; // New prop to close the dialog
}

const EditFlatPage: React.FC<EditFlatPageProps> = ({ flat, onClose }) => {
  console.log('Flat ID in EditFlatPage:', flat.flatId); // Debugging
  return (
    <div>
      <h2>Edit Flat</h2>
      {/* Pass the flat data and set isEditing to true */}
      <FlatForm initialFlat={flat} isEditing={true} onFormSubmit={onClose} />
    </div>
  );
};

export default EditFlatPage;

// import { useEffect, useState } from 'react';
// import { Flat } from '../components/Interfaces/FlatInterface';
// import { getUserByEmail, updateFlat } from '../services/firebase'; // Ensure updateFlat is imported
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { Dialog } from 'primereact/dialog';

// interface EditFlatPageProps {
//   flat: Flat | undefined;
//   method: 'upd'
//   onClose: () => void;
// }

// const EditFlatPage: React.FC<EditFlatPageProps> = ({ flat, onClose }) => {
//   const [updatedFlat, setUpdatedFlat] = useState<Flat>(flat);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         // Fetch user by email (flat.flatUser) to prefill user data if needed
//         await getUserByEmail(flat.flatUser);
//       } catch (error) {
//         console.error('Failed to fetch user:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [flat.flatUser]);

//   const handleSave = async () => {
//     try {
//       // Save updated flat details
//       await updateFlat(updatedFlat); // Ensure updateFlat is called to update Firestore
//       onClose(); // Close dialog after saving
//     } catch (error) {
//       console.error('Error saving flat details:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Dialog
//       header="Edit Flat"
//       visible={true}
//       style={{ width: '50vw' }}
//       onHide={onClose}
//     >
//       <div>
//         <h2>Edit Flat</h2>
//         <div className="p-field">
//           <label htmlFor="streetName">Street Name</label>
//           <InputText
//             id="streetName"
//             value={flat.streetName}
//             onChange={(e) =>
//               setUpdatedFlat({ ...updatedFlat, streetName: e.target.value })
//             }
//           />
//         </div>
//         <div className="p-field">
//           <label htmlFor="price">Price</label>
//           <InputText
//             id="price"
//             value={updatedFlat.price.toString()} // Convert number to string
//             onChange={(e) =>
//               setUpdatedFlat({
//                 ...updatedFlat,
//                 price: parseFloat(e.target.value), // Convert string to number
//               })
//             }
//           />
//         </div>
//         {/* Add more fields as necessary */}
//         <Button label="Save" icon="pi pi-check" onClick={handleSave} />
//         <Button label="Cancel" icon="pi pi-times" onClick={onClose} />
//       </div>
//     </Dialog>
//   );
// };

// export default EditFlatPage;
