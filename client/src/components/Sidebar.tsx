import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
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
    <div className='drawer-side z-50'>
      <label
        htmlFor='my-drawer-3'
        aria-label='close sidebar'
        className='drawer-overlay'></label>
      <ul className='menu bg-base-200 min-h-full w-64 p-4 pt-20'>
        {/* Sidebar content here */}
        {userInfo ? (
          <li>
            <h2 className='text-2xl font-semibold'>
              {userInfo?.name?.trim().split(/\s+/)[0]}
            </h2>
            <Link className='bg-base-200' to='/account'>
              Record
            </Link>
            {userInfo.role === 'admin' && (
              <>
                <Link className='bg-base-200' to='/account/admin'>
                  Users
                </Link>
              </>
            )}
            <Link className='bg-base-200' to='/account/profile'>
              Profile
            </Link>
            <LogoutButton />
          </li>
        ) : (
          <>
            <li className={`${signInPage ? 'block' : 'hidden'}`}>
              <Link to='/sign-in'>Sign in</Link>
            </li>
            <li className={`${signUpPage ? 'block' : 'hidden'}`}>
              <Link to='/sign-up'>Sign up</Link>
            </li>
          </>
        )}

        <div className='divider'></div>
        <li className={`${homePage ? 'block true' : 'hidden false'}`}>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/mocks'>Mock</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
