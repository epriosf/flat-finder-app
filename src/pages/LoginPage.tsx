import { LoginForm } from '../components/Users/LoginForm';
import { TabView, TabPanel } from 'primereact/tabview';
import { RegisterPage } from './RegisterPage';
// import './TabViewDemo.css';

export const LoginPage = () => {
  return (
    <>
      <div className="card">
        <TabView>
          <TabPanel header="Log In">
            <LoginForm />
          </TabPanel>
          <TabPanel header="Sign Up">
            <RegisterPage />
          </TabPanel>
        </TabView>
      </div>
      {/* <LoginForm /> */}
    </>
  );
};
