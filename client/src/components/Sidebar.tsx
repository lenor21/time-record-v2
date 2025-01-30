import { NavLink, useLocation } from 'react-router';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const [signInPage, setSignInPage] = useState(false);
  const [signUpPage, setSignUpPage] = useState(false);
  const [homePage, setHomePage] = useState(false);

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setSignInPage(true);
        setSignUpPage(true);
        setHomePage(true);
        break;
      case '/mocks':
        setSignInPage(true);
        setSignUpPage(true);
        setHomePage(true);
        break;
      case '/sign-in':
        setSignInPage(false);
        setSignUpPage(true);
        setHomePage(true);
        break;
      case '/sign-up':
        setSignInPage(true);
        setSignUpPage(false);
        setHomePage(true);
        break;
      default:
        setSignInPage(false);
        setSignUpPage(false);
        setHomePage(false);
        break;
    }
  }, [location]);

  return (
    <div className='drawer-side z-50'>
      <label
        htmlFor='my-drawer-3'
        aria-label='close sidebar'
        className='drawer-overlay'></label>
      <ul className='menu bg-base-200 min-h-full w-80 p-4 pt-20'>
        {/* Sidebar content here */}
        <li>
          <h2 className='text-2xl font-semibold'>RONEL DE JESUS</h2>
          <NavLink className='bg-base-200' to='/profile'>
            Profile
          </NavLink>
          <NavLink className='bg-base-200' to='/logout'>
            Logout
          </NavLink>
        </li>
        <div className='divider'></div>
        <li className={`${homePage ? 'block true' : 'hidden false'}`}>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/mocks'>Mock</NavLink>
        </li>
        <li className={`${signInPage ? 'block' : 'hidden'}`}>
          <NavLink to='/sign-in'>Sign in</NavLink>
        </li>
        <li className={`${signUpPage ? 'block' : 'hidden'}`}>
          <NavLink to='/sign-up'>Sign up</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
