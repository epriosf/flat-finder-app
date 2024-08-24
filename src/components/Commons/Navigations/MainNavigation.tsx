import { NavLink } from 'react-router-dom';

const MainNavigation = () => {
  return (
    <>
      <li>
        <NavLink to="/home">Home</NavLink>
      </li>
      <li>
        <NavLink to="/home/myFlats">myFlats</NavLink>
      </li>
      <li>
        <NavLink to="/home/addUser">AddUsers</NavLink>
      </li>
    </>
  );
};
export default MainNavigation;
