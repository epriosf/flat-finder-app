import MainNavigation from '../components/Commons/Navigations/MainNavigation';

const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>An Error ocurred</h1>
        <p>Could not find this page</p>
      </main>
    </>
  );
};
export default ErrorPage;
