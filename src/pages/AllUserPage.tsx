import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SortBy } from '../components/Commons/SortBy/SortBy';
import UserList from '../components/Users/UserList';
import { db } from '../config/firebase';
import { UserOutput } from '../types/User';

const AllUserPage = () => {
  const [users, setUsers] = useState<UserOutput[]>([]);
  const [flatsCount, setFlatsCount] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            birthday: data.birthday ? data.birthday.toDate() : null,
            profile: data.profile,
            isAdmin: data.isAdmin,
          } as UserOutput;
        });
        setUsers(usersList);

        // Fetch flats count for each user
        const flatsCountObj: { [key: string]: number } = {};
        for (const user of usersList) {
          const flatsQuery = query(
            collection(db, 'flats'),
            where('flatUser', '==', user.email),
          );
          const flatsSnapshot = await getDocs(flatsQuery);
          flatsCountObj[user.email] = flatsSnapshot.size;
        }

        // Set the state for flats count
        setFlatsCount(flatsCountObj);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const sortUsersByFirstName = (order: 'asc' | 'desc') => {
    const sortedUsersFirstName = [...users].sort((a, b) => {
      if (a.firstName < b.firstName) return order === 'asc' ? -1 : 1;
      if (a.firstName > b.firstName) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsersFirstName);
  };

  const sortUsersByLastName = (order: 'asc' | 'desc') => {
    const sortedUsersLastName = [...users].sort((a, b) => {
      if (a.lastName < b.lastName) return order === 'asc' ? -1 : 1;
      if (a.lastName > b.lastName) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsersLastName);
  };
  const sortUsersByFlatsCount = (order: 'asc' | 'desc') => {
    const sortedUsersByFlats = [...users].sort((a, b) => {
      const countA = flatsCount[a.email] || 0;
      const countB = flatsCount[b.email] || 0;
      return order === 'asc' ? countA - countB : countB - countA;
    });
    setUsers(sortedUsersByFlats);
  };

  return (
    <>
      <div className="flex justify-content-between items-center w-full">
        <p className="font-bold text-2xl">All Users</p>
        <div className="flex gap-2">
          <div className="flex align-items-center justify-content-center w-4rem h-4rem font-bold border-round">
            <SortBy
              sortUsersByFirstName={sortUsersByFirstName}
              sortUsersByLastName={sortUsersByLastName}
              sortUsersByFlatsCount={sortUsersByFlatsCount}
            />
          </div>
          <div className="flex align-items-center justify-content-center w-4rem h-4rem font-bold border-round">
            {/* <SortBy sortUsersByFirstName={sortUsersByFirstName} /> */}
          </div>
        </div>
      </div>

      <UserList users={users} flatsCount={flatsCount} />
    </>
  );
};
export default AllUserPage;
