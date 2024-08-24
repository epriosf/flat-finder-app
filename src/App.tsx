import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './custompanel.css';
import ErrorPage from './pages/ErrorPage';
import LoginRegister from './pages/LoginRegisterPage';
import RootLayout from './pages/RootPage';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginForm = lazy(() => import('./components/Users/LoginForm'));
const FavouritePage = lazy(() => import('./pages/FavouritesPage'));
const AllUserPage = lazy(() => import('./pages/AllUserPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const EditFlatPage = lazy(() => import('./pages/EditFlatPage'));
const MyFlatsPage = lazy(() => import('./pages/MyFlatsPage'));
const NewFlatPage = lazy(() => import('./pages/NewFlatPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const UpdateProfilePage = lazy(() => import('./pages/UpdateProfilePage'));
const FlatDetailsPage = lazy(() => import('./pages/FlatDetailsPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginRegister />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RegisterPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/home/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },

      {
        path: 'favorites',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FavouritePage />
          </Suspense>
        ),
      },
      {
        path: 'all-users',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AllUserPage />
          </Suspense>
        ),
      },
      {
        path: 'edit',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EditFlatPage />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: 'my-flats',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MyFlatsPage />
          </Suspense>
        ),
      },
      {
        path: 'new-flat',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NewFlatPage />
          </Suspense>
        ),
      },
      {
        path: 'update-profile',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UpdateProfilePage />
          </Suspense>
        ),
      },
      {
        path: 'flat-details',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FlatDetailsPage />
          </Suspense>
        ),
      },
      { path: '*', element: <ErrorPage /> },
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
