import { MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';
import { NavLink } from 'react-router-dom';
import './LoginRegisterNavigation.css';
const LoginRegisterNavigation = () => {
  const items: MenuItem[] = [
    {
      label: 'Login',
      template: (item, options) => (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? `${options.className} p-highlight` : options.className
          }
        >
          {item.label}
        </NavLink>
      ),
    },
    {
      label: 'Register',
      template: (item, options) => (
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? `${options.className} p-highlight` : options.className
          }
        >
          {item.label}
        </NavLink>
      ),
    },
  ];
  return (
    <>
      <TabMenu model={items} />
    </>
  );
};
export default LoginRegisterNavigation;
