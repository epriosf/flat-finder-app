import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginForm } from './components/Users/LoginForm';
import './custompanel.css';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginRegister from './pages/LoginRegisterPage';
import MyFlatsPage from './pages/MyFlatsPage';
import RegisterPage from './pages/RegisterPage';
import RootLayout from './pages/RootPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginRegister />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'login', element: <LoginForm /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/home',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'myFlats', element: <MyFlatsPage /> },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
