import { ConfirmDialog } from 'primereact/confirmdialog';
import UserCard from '../Commons/Cards/UserCard';
import { UserRegister } from '../Interfaces/UserInterface';

type UserListProps = {
  users: UserRegister[];
  flatsCount: { [key: string]: number };
};
const UserList: React.FC<UserListProps> = ({ users, flatsCount }) => {
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
          />
        </div>
      ))}
      <ConfirmDialog />
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
