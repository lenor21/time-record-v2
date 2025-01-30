import { NavLink, Link, useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

import LogoutButton from './LogoutButton';

const Header = () => {
  const [signInPage, setSignInPage] = useState(false);
  const [signUpPage, setSignUpPage] = useState(false);
  const [homePage, setHomePage] = useState(false);

  const location = useLocation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

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
        setHomePage(true);
        break;
    }
  }, [location]);

  return (
    <div className='fixed top-0 left-0 navbar glass w-full z-40'>
      <div className='container mx-auto'>
        <div className='flex-none lg:hidden'>
          <label
            htmlFor='my-drawer-3'
            aria-label='open sidebar'
            className='btn btn-square btn-ghost'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block h-6 w-6 stroke-current'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'></path>
            </svg>
          </label>
        </div>
        <h1 className='flex-1 px-2 lg:px-4'>
          <Link to='/'>Time Record v2</Link>
        </h1>
        <div className='hidden flex-none lg:block'>
          <ul className='menu menu-horizontal gap-x-2'>
            {/* Navbar menu content here */}
            <li className={`${homePage ? 'block true' : 'hidden false'}`}>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/mocks'>Mock</NavLink>
            </li>

            {userInfo ? (
              <li>
                <details>
                  <summary>{userInfo.name.trim().split(/\s+/)[0]}</summary>
                  <ul className='bg-base-100 rounded-t-none p-2 '>
                    <li>
                      <Link to='/account'>Record</Link>
                    </li>
                    <li>
                      <Link to='/account/profile'>Profile</Link>
                    </li>
                    <li>
                      <LogoutButton />
                    </li>
                  </ul>
                </details>
              </li>
            ) : (
              <>
                <li className={`${signInPage ? 'block' : 'hidden'}`}>
                  <NavLink to='/sign-in'>Sign in</NavLink>
                </li>
                <li className={`${signUpPage ? 'block' : 'hidden'}`}>
                  <NavLink to='/sign-up'>Sign up</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
