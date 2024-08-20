import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();
  return (
    <>
      <h1>Home Page</h1>
      <p>{user?.email}</p>
    </>
  );
};
export default HomePage;
