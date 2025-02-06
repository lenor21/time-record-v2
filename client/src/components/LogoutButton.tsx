import { useLogoutMutation } from '../features/auth/usersApiSlice';
import { clearCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { clearRecord } from '../features/record/recordSlice';

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall]: any = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      Swal.fire({
        title: 'Are you sure you want to logout?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout',
      }).then(async (result): Promise<any> => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Logout!',
            text: 'Your account has been logged out.',
            icon: 'success',
          });

          await logoutApiCall().unwrap();
          dispatch(clearCredentials());
          dispatch(clearRecord());
          navigate('/');
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='md:bg-[#2b3440] md:text-white' onClick={logoutHandler}>
      Logout
    </div>
  );
};

export default LogoutButton;
