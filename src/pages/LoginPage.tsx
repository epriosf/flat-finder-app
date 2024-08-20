import { LoginForm } from '../components/Users/LoginForm';
import { TabView, TabPanel } from 'primereact/tabview';
import { RegisterPage } from './RegisterPage';
import { Image } from 'primereact/image';
import LogoWhite from './../images/logo-white.svg';
// import './TabViewDemo.css';

export const LoginPage = () => {
  return (
    <div className="flex justify-content-center align-items-center w-screen h-screen flex-column bg-login-img">
      <div className="w-26rem bg-indigo-800 flex justify-content-center align-items-center p-3 border-round-lg mb-4">
        <Image src={LogoWhite} alt="Image" width="150" />
        {/* <img src="./../images/logo-white.svg" alt="logo" /> */}
      </div>
      <div className="card w-26rem flex justify-content-center align-items-center border-round-lg bg-login overflow-scroll h-75">
        <TabView className="bg-transparent border-round-lg w-full justify-content-center h-full">
          <TabPanel
            header="Log In"
            className="text-white bg-transparent text-center justify-content-center"
          >
            <LoginForm />
          </TabPanel>
          <TabPanel
            header="Sign Up"
            className="text-white bg-transparent text-center justify-content-center"
          >
            <RegisterPage />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};
