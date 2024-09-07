import { ConfirmDialog } from 'primereact/confirmdialog';
import { useState } from 'react';
import { deleteUserByEmail, updateUserByEmail } from '../../services/firebase';
import UserCard from '../Commons/Cards/UserCard';
import { UserRegister } from '../Interfaces/UserInterface';

type UserListProps = {
  users: UserRegister[];
  flatsCount: { [key: string]: number };
};

const UserList: React.FC<UserListProps> = ({ users, flatsCount }) => {
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [confirmDeleteDialogVisible, setConfirmDeleteDialogVisible] =
    useState(false);
  const [selectedUserForAdminToggle, setSelectedUserForAdminToggle] =
    useState<UserRegister | null>(null);
  const [selectedUserForDelete, setSelectedUserForDelete] =
    useState<UserRegister | null>(null);

  const handleToggleAdmin = (user: UserRegister) => {
    setSelectedUserForAdminToggle(user);
    setConfirmDialogVisible(true);
  };

  const handleDeleteUser = (user: UserRegister) => {
    setSelectedUserForDelete(user);
    setConfirmDeleteDialogVisible(true);
  };

  const handleConfirmToggleAdmin = async () => {
    if (selectedUserForAdminToggle) {
      try {
        await updateUserByEmail(selectedUserForAdminToggle.email, {
          isAdmin: !selectedUserForAdminToggle.isAdmin,
        });
        window.location.reload();
        console.log(
          `Admin status toggled for user with email ${selectedUserForAdminToggle.email}`,
        );
        // Update the UI or state here instead of reloading the page
      } catch (error) {
        console.error('Error toggling admin status:', error);
      }
      setConfirmDialogVisible(false);
    }
  };

  const handleConfirmDeleteUser = async () => {
    if (selectedUserForDelete) {
      try {
        await deleteUserByEmail(selectedUserForDelete.email);
        window.location.reload();
        console.log(
          `User with email ${selectedUserForDelete.email} deleted successfully`,
        );
        // Update the UI or state here instead of reloading the page
      } catch (error) {
        console.error('Error deleting user:', error);
      }
      setConfirmDeleteDialogVisible(false);
    }
  };

  const handleCancel = () => {
    setConfirmDialogVisible(false);
    setConfirmDeleteDialogVisible(false);
  };

  return (
    <div className="grid">
      {users.map((user, index) => (
        <div
          key={index}
          className="col-12 xl:col-4 lg:col-4 md:col-6 sm:col-12"
        >
          <UserCard
            user={user}
            age={calculateAge(user.birthday)}
            birthday={
              user.birthday ? user.birthday.toLocaleDateString('en-GB') : 'N/A'
            }
            flatsNumber={flatsCount[user.email] || 0}
            onToggleAdmin={() => handleToggleAdmin(user)}
            onDeleteUser={() => handleDeleteUser(user)}
          />
        </div>
      ))}
      {selectedUserForAdminToggle && (
        <ConfirmDialog
          visible={confirmDialogVisible}
          onHide={handleCancel}
          message="Are you sure you want to toggle the admin status of this user?"
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          acceptClassName="p-button-danger"
          accept={handleConfirmToggleAdmin}
          reject={handleCancel}
        />
      )}
      {selectedUserForDelete && (
        <ConfirmDialog
          visible={confirmDeleteDialogVisible}
          onHide={handleCancel}
          message="Are you sure you want to delete the user?"
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          acceptClassName="p-button-danger"
          accept={handleConfirmDeleteUser}
          reject={handleCancel}
        />
      )}
    </div>
  );
};

// Helper function to calculate age from birthday
export const calculateAge = (birthday: Date | null): number => {
  if (!birthday) return 0;
  const diff = Date.now() - birthday.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default UserList;
