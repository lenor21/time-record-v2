import { useState } from 'react';
import UserCard from '../../../components/UserCard';
import { useGetUsersQuery } from '../../../features/auth/usersApiSlice';
import Loader from '../../../components/Loader';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: posts, isLoading } = useGetUsersQuery(currentPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <Loader />;
  }

  const users = posts.users.map((item: any) => (
    <UserCard key={item._id} {...item} />
  ));

  return (
    <div className='min-h-[80vh] py-20'>
      <h2 className='mb-10'>List of users</h2>
      <ul className='w-full bg-slate-100 py-10 px-5 sm:p-10 rounded-xl grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {users}
      </ul>

      <div className='grid place-items-center mt-20'>
        <div className='join'>
          <button
            className='join-item btn'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}>
            «
          </button>
          <button className='join-item btn'>
            Page {currentPage}/{posts.totalPages}
          </button>
          <button
            className='join-item btn'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === posts.totalPages}>
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
