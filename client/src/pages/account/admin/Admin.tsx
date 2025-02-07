import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router';
import { RootState } from '../../../app/store';

const Admin = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo.role === 'admin' ? <Outlet /> : <Navigate to='/account' />;
};

export default Admin;
