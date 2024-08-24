import { Outlet } from 'react-router';
import MainNavigation from '../components/Commons/Navigations/MainNavigation';

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};
export default RootLayout;
