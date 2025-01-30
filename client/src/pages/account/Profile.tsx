import { useDetailQuery } from '../../features/auth/usersApiSlice';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import UpdateProfileModal from '../../components/UpdateProfileModal';
import { useEffect } from 'react';

const Profile = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { data, isLoading, refetch } = useDetailQuery(userInfo._id);

  const handleEditProfile = async () => {
    const modal = document.getElementById('my_modal_5') as HTMLDialogElement;

    if (modal) {
      modal.showModal();
    } else {
      console.error('Modal not found!');
    }
  };

  useEffect(() => {
    if (userInfo) {
      refetch();
    }
  }, [userInfo]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='grid place-items-center min-h-[80vh] py-20'>
      <div className='card bg-base-100 w-[20=1rem] md:w-96 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title text-3xl mb-2'>{data?.name}</h2>
          <p className='font-light'>
            <span className='font-semibold'>User ID: </span>
            {data?._id}
          </p>
          <p className='font-light'>
            <span className='font-semibold'>Email: </span>
            {data?.email}
          </p>
          <p className='font-light'>
            <span className='font-semibold'>Role: </span>
            {data?.role}
          </p>
          <p className='font-light'>
            <span className='font-semibold'>Updated: </span>
            {new Date(data?.updatedAt).toLocaleString()}
          </p>
          <p className='font-light'>
            <span className='font-semibold'>Created: </span>
            {new Date(data?.createdAt).toLocaleString()}
          </p>
          <div className='divider'></div>
          <div className='card-actions justify-end'>
            <button onClick={handleEditProfile} className='btn btn-neutral'>
              Edit Profile
            </button>
            <UpdateProfileModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
