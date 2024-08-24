import { Outlet } from 'react-router';
import Header from '../components/Commons/Header';
import Footer from '../components/Commons/Footer';

const RootLayout = () => {
  return (
    <>
      <Header />
      <div className="w-full min-h-full flex-grow-1 mt-8 pt-4 max-w-1200 px-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default RootLayout;
