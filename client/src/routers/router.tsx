import { createBrowserRouter } from 'react-router';
import App from '../App';
import Home from '../pages/Home';
import Mock from '../pages/Mock';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Account from '../pages/account/Account';
import Record from '../pages/account/Record';
import PrivateRoute from '../components/PrivateRoute';
import Profile from '../pages/account/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/mocks',
        element: <Mock />,
      },
      {
        path: '/sign-in',
        element: <Login />,
      },
      {
        path: '/sign-up',
        element: <Register />,
      },
      {
        path: '',
        element: <PrivateRoute />,
        children: [
          {
            path: '/account',
            element: <Account />,
            children: [
              {
                path: '/account',
                element: <Record />,
              },
              {
                path: '/account/profile',
                element: <Profile />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
