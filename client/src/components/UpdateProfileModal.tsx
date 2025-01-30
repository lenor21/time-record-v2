import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useUpdateUserMutation } from '../features/auth/usersApiSlice';
import Swal from 'sweetalert2';
import { clearCredentials, setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router';

const UpdateProfileModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const modalRef = useRef<HTMLDialogElement>(null);

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `Password do not match`,
        showConfirmButton: false,
        timer: 2000,
      });

      if (modalRef.current) {
        modalRef.current.close();
      }
    } else {
      try {
        const res = await updateUser({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials({ ...res }));

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your profile has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err: any) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${err.data.message}`,
          showConfirmButton: false,
          timer: 2000,
        });

        dispatch(clearCredentials());

        navigate('/');
      }
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  useEffect(() => {
    setFormData({
      ...userInfo,
      password: '',
      confirmPassword: '',
    });
  }, [userInfo]);

  if (isLoading) {
    return;
  }

  return (
    <dialog
      ref={modalRef}
      id='my_modal_5'
      className='modal modal-middle sm:modal-middle'>
      <div className='modal-box w-[90%] md:w-96'>
        <h3 className='font-bold text-lg'>Update profile</h3>
        <p className='py-4'>Press ESC key or click the button below to close</p>
        <div className='modal-action'>
          <form
            className='w-full flex flex-col gap-y-4'
            onSubmit={handleSubmit}>
            <div className='card-actions'>
              <input
                type='text'
                placeholder='Name'
                className={`input bg-white input-bordered w-full `}
                id='name'
                name='name'
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className='card-actions'>
              <input
                type='email'
                placeholder='Email'
                className={`input bg-white input-bordered w-full `}
                id='email'
                name='email'
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className='card-actions'>
              <input
                type='text'
                placeholder='Password'
                className={`input bg-white input-bordered w-full `}
                id='password'
                name='password'
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className='card-actions'>
              <input
                type='text'
                placeholder='Confirm password'
                className={`input bg-white input-bordered w-full `}
                id='confirmPassword'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type='submit' className='btn btn-neutral'>
              Update
            </button>
            <button
              type='button'
              id='closeModal'
              className='btn'
              onClick={handleCloseModal}>
              Close!
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateProfileModal;
