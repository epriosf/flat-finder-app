import { Outlet } from 'react-router';
import Header from '../components/Commons/Header';

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default RootLayout;
