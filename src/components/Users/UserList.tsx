import { UserOutput } from '../../types/User';
import UserCard from '../Commons/Cards/UserCard';

type UserListProps = {
  users: UserOutput[];
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
            image={user.profile}
            name={user.firstName}
            lastname={user.lastName}
            age={calculateAge(user.birthday)}
            email={user.email}
            birthday={
              user.birthday ? user.birthday.toLocaleDateString('en-GB') : 'N/A'
            }
            flatsNumber={flatsCount[user.email] || 0}
            isAdmin={user.isAdmin}
          />
        </div>
      ))}
    </div>
  );
};

// Helper function to calculate age from birthday
const calculateAge = (birthday: Date | null): number => {
  if (!birthday) return 0;
  const diff = Date.now() - birthday.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default UserList;
